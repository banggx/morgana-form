import { useEffect, useState } from 'react'
import useGetComponents from "./useGetComponents"
import { nanoid } from 'nanoid'

export default function useFlowData() {
  const { flow } = useGetComponents()
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])

  useEffect(() => {
    if (!flow) return
    const currentNodes = []
    const currentEdges = []
    for (const key in flow) {
      const flowNode = flow[key]
      currentNodes.push({
        id: key,
        type: flowNode.type,
        draggable: true,
        selectable: true,
        data: flowNode.data,
        position: flowNode.position,
      })
      if (flowNode.next) {
        for (const edge of flowNode.next) {
          const { sourceHandle, targetHandle, targetId } = edge
          currentEdges.push({
            id: `${key}_${targetId}_${nanoid()}`,
            source: key,
            sourceHandle: sourceHandle,
            target: targetId,
            targetHandle: targetHandle
          })
        }
      }
    }
    setNodes(currentNodes)
    setEdges(currentEdges)
  }, [flow])

  return {
    nodes,
    edges
  }
}