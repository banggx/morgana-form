import { ComponentSourceHandle, ComponentTargetHandle, ConditionSourceHandle, GraphEdge, GraphNode, GraphNodeType } from "@/typings/graph";
import { callFunctionWithCatch, evalWithCatch, getFunctionByCode } from "./utils";
import { FormInstance } from "antd";

interface ComponentInstance {
  setVisible: (visible: boolean) => void;
  changeValue?: (value: any) => void;
}
export default class FlowAction {
  static instance: FlowAction;
  
  static getInstance(flow: Record<string, GraphNode>, form: FormInstance): FlowAction {
    if (!FlowAction.instance) {
      FlowAction.instance = new FlowAction(flow, form);
    }
    return FlowAction.instance;
  }

  form: FormInstance;
  flow: Record<string, GraphNode>;
  componentFlows: Record<string, GraphNode> = {};
  componentInsMap: Map<string, ComponentInstance> = new Map()
  private constructor(flow: Record<string, GraphNode>, form: FormInstance) {
    this.flow = flow
    this.form = form
    this.processFlow()
  }

  /**
   * 预处理流程节点，提取出组件节点进行映射
   * 触发从组件节点开始
   */
  private processFlow() {
    for (const key in this.flow) {
      const flowNode = this.flow[key]
      if (flowNode.type === GraphNodeType.Component) {
        const { fromId } = flowNode.data
        this.componentFlows[fromId] = flowNode
      }
    }
  }

  registerComponent(key: string, instance: ComponentInstance) {
    this.componentInsMap.set(key, instance)
  }

  unregisterComponent(key: string) {
    this.componentInsMap.delete(key)
  }

  trigger(fromId: string, handle: ComponentSourceHandle, ...args: any) {
    const flowNode = this.componentFlows[fromId]
    if (!flowNode || !flowNode.next?.length) return

    flowNode.next.forEach(edge => {
      if (edge.sourceHandle !== handle) return
      this.processNodeChain(edge, ...args)
    })
  }

  processNodeChain(edge: GraphEdge, ...args: any) {
    const targetNode = this.flow[edge.targetId]
    
    switch (targetNode.type) {
      case GraphNodeType.Component:
        this.processComponent(targetNode, edge.targetHandle as ComponentTargetHandle, ...args)
        break;
      case GraphNodeType.Condition:
        this.processCondition(targetNode, args?.[0])
        break;
      case GraphNodeType.Logic:
        this.processLogic(targetNode, args?.[0])
    }
  }

  private conditionFormat(condition: string) {
    // = 转化为 '==='
    if (/=.*/.test(condition)) {
      return '==='
    }
    return condition
  }

  private processCondition(conditionNode: GraphNode, input: any) {
    const { data } = conditionNode
    const { condition, value } = data || {}

    if (!conditionNode.next?.length || !value || !condition) return
    // 对条件进行预处理
    const formatCondition = this.conditionFormat(condition)
    const conditionResult = evalWithCatch(`'${input}'${formatCondition}'${value.toString()}'`, false)
    conditionNode.next.forEach(edge => {
      if (conditionResult && edge.sourceHandle === ConditionSourceHandle.True) {
        this.processNodeChain(edge, true)
      } else if (!conditionResult && edge.sourceHandle === ConditionSourceHandle.False) {
        this.processNodeChain(edge, false)
      }
    })
  }

  processLogic(logicNode: GraphNode, input: any) {
    const { data } = logicNode
    if (!data.compileCode) return
    
    const logicFn = getFunctionByCode(data.compileCode)
    const result = callFunctionWithCatch(logicFn, input, this.form)

    if (logicNode.next?.length) {
      logicNode.next.forEach(edge => {
        this.processNodeChain(edge, result)
      })
    }
  }

  private processComponent(componentNode: GraphNode, handle: ComponentTargetHandle, ...args: any) {
    const { fromId } = componentNode.data
    const instance = this.componentInsMap.get(fromId)
    if (!instance) return
    switch (handle) {
      case ComponentTargetHandle.visible:
        instance.setVisible(args[0])
        break;
      case ComponentTargetHandle.change:
        instance.changeValue?.(args[0])
        break;
    }
  }
}