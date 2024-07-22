/**
 * 表单图谱类型定义
 */
export enum GraphNodeType {
  Component = 'component', // 组件节点
  Condition = 'condition',  // 条件节点
  Logic = 'logic' // 逻辑节点
}
export interface BaseGrapyNode {
  id: string;
  type: GraphNodeType;
}
export interface GraphEdge {
  sourceHandle: string;
  targetHandle: string;
  targetId: string;
}
export type GraphNode = {
  type: GraphNodeType;
  data: Record<string, any>;
  position: { x: number, y: number };
  next?: GraphEdge[]
}
export enum ComponentSourceHandle {
  change = 'change',
  submit = 'submit',
  click = 'click'
}
export enum ComponentTargetHandle {
  visible = 'visible',
  change = 'change'
}
export enum ConditionTargetHandle {
  source = 'source'
}
export enum ConditionSourceHandle {
  True = 'true',
  False = 'false'
}
export enum LogicTargetHandle {
  source = 'source'
}
export enum LogicSourceHandle {
  result = 'result'
}