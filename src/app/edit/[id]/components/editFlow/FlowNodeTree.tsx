import { useState, useEffect } from 'react'
import { Tabs, Button, message } from 'antd'
import { GraphNodeType } from '@/typings/graph'
import useGetComponents from '@/hooks/useGetComponents'
import { DRAG_NODE_KEY } from './constants'
import { useReactFlow, useNodes } from '@xyflow/react'
import { useDispatch } from 'react-redux'
import { setFlow } from '@/store/componentReducer'
import { cn } from '@/lib/utils'

function ComponentNodeList() {
  const { components } = useGetComponents()
  const [existMap, setExistMap] = useState<Record<string, boolean>>({})
  const nodes = useNodes()

  useEffect(() => {
    setExistMap(() => nodes.reduce<Record<string, boolean>>((acc, item) => {
      if (item.type === GraphNodeType.Component) {
        const id = item.data.fromId as string;
        id && (acc[id] = true)
      }
      return acc
    }, {}))
  }, [nodes])

  const setDragNodeHandle = (ev: React.DragEvent<HTMLDivElement>, id: string) => {
    ev.dataTransfer.setData(DRAG_NODE_KEY, JSON.stringify({ type: GraphNodeType.Component, fromId: id }))
    ev.dataTransfer.effectAllowed = 'move';
  }

  return <div>
    {
      components.map(component => (<div
        key={component.id}
        className={cn('w-full h-10 border border-slate-200 broder-solid rounded-md px-2 shadow-md leading-10 mb-2 cursor-move dark:border-slate-600', {
          'bg-slate-300 cursor-not-allowed dark:bg-slate-600': existMap[component.id]
        })}
        draggable={!existMap[component.id]}
        onDragStart={(ev) => setDragNodeHandle(ev, component.id)}
      >
        <p className='w-full text-ellipsis overflow-hidden whitespace-nowrap'>{component.name}</p>
      </div>))
    }
  </div>
}

function LogicNodeList() {
  const setDragNodeHandle = (ev: React.DragEvent<HTMLDivElement>, type: GraphNodeType) => {
    ev.dataTransfer.setData(DRAG_NODE_KEY, JSON.stringify({ type: type }))
    ev.dataTransfer.effectAllowed = 'move';
  }

  return <>
    <div
      className='w-full h-10 border border-slate-200 broder-solid rounded-md px-2 shadow-md leading-10 mb-2 cursor-move dark:border-slate-600'
      draggable='true'
      onDragStart={(ev) => setDragNodeHandle(ev, GraphNodeType.Condition)}
    >条件节点</div>
    <div
      className='w-full h-10 border border-slate-200 broder-solid rounded-md px-2 shadow-md leading-10 mb-2 cursor-move dark:border-slate-600'
      draggable='true'
      onDragStart={(ev) => setDragNodeHandle(ev, GraphNodeType.Logic)}
    >逻辑节点</div>
  </>
}

const FlowNodeTabs = [
  {
    key: 'component',
    label: '页面节点',
    children: <ComponentNodeList />
  },
  {
    key: 'logic',
    label: '逻辑节点',
    children: <LogicNodeList />
  }
]

export default function FlowNodeTree() {
  const dispatch = useDispatch()
  const reactFlow = useReactFlow()

  const saveFlow = () => {
    const nodes = reactFlow.getNodes()
    const edges = reactFlow.getEdges()
    // 对边处理，形成 sourceId -> edge, targetId -> edge 的映射
    const sourceEdgeMap: Record<string, any[]> = {}
    const targetEdgeMap: Record<string, any[]> = {}
    edges.forEach(edge => {
      const sourceId = edge.source
      const targetId = edge.target
      if (!sourceEdgeMap[sourceId]) {
        sourceEdgeMap[sourceId] = []
      }
      sourceEdgeMap[sourceId].push(edge)
      if (!targetEdgeMap[targetId]) {
        targetEdgeMap[targetId] = []
      }
      targetEdgeMap[targetId].push(edge)
    })
    const nodeMap: Record<string, any> = {}
    nodes.forEach(node => {
      nodeMap[node.id] = node
    })
    
    const resultNodeMap: Record<string, any> = {}
    // 从源节点边开始遍历
    for (const sourceId in sourceEdgeMap) {
      const sourceEdges = sourceEdgeMap[sourceId]
      const sourceNode = nodeMap[sourceId]
      let resultNode = resultNodeMap[sourceId];
      if (!resultNode) {
        resultNode = resultNodeMap[sourceId] = {
          type: sourceNode.type,
          data: sourceNode.data,
          position: sourceNode.position,
          next: [],
        }
      }
      // 遍历源节点的边，找到目标节点
      for (const sourceEdge of sourceEdges) {
        const { target, sourceHandle, targetHandle } = sourceEdge
        // 遍历目标节点的边，找到源节点
        const targetResultNode = {
          targetId: target,
          sourceHandle,
          targetHandle,
        };
        resultNode.next.push(targetResultNode)
      }
    }
    // 遍历目标节点, 将不存在输入的节点加入到结果中
    for (const targetId in targetEdgeMap) {
      const targetNode = nodeMap[targetId]
      let resultNode = resultNodeMap[targetId];
      if (!resultNode) {
        resultNode = resultNodeMap[targetId] = {
          type: targetNode.type,
          data: targetNode.data,
          position: targetNode.position,
        }
      }
    }
    dispatch(setFlow(resultNodeMap))
    message.success('数据已保存')
  }

  return (<div className='w-[280px] flex-none bg-white p-2 shadow-md overflow-auto dark:bg-slate-950'>
    <Tabs
      size="small"
      type="card"
      items={FlowNodeTabs}
      tabBarExtraContent={<>
        <Button type="primary" onClick={saveFlow}>保存</Button>
      </>}
    />
  </div>)
}