import React, { useCallback, useEffect } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  MiniMap,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import ComponentNode from "./ComponentNode";
import ConditionNode from "./ConditionNode";
import LogicNode from "./LogicNode";
import FlowNodeTree from "./FlowNodeTree";
import { GraphNodeType } from "@/typings/graph";
import { DRAG_NODE_KEY } from "./constants";
import { parseJSONWithCatch } from "@/lib/utils";
import useFlowData from "@/hooks/useFlowData";
import useGetGlobal from "@/hooks/useGetGlobal";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  [GraphNodeType.Component]: ComponentNode,
  [GraphNodeType.Condition]: ConditionNode,
  [GraphNodeType.Logic]: LogicNode,
};

function BaseEditFlow() {
  const { nodes: initialNodes, edges: initialEdges } = useFlowData();
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>(initialEdges);
  const reactflow = useReactFlow();
  const { theme } = useGetGlobal();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const onConnect = useCallback((params: any) => {
    setEdges((eds: any[]) => addEdge(params, eds));
  }, []);

  const handleDropFlowNode = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const jsonData = ev.dataTransfer.getData(DRAG_NODE_KEY);
    if (jsonData) {
      const { type, ...extraData } = parseJSONWithCatch(jsonData);
      setNodes(
        nodes.concat([
          {
            id: nanoid(),
            type: type,
            draggable: true,
            selectable: true,
            data: extraData,
            position: reactflow.screenToFlowPosition(
              { x: ev.clientX, y: ev.clientY },
              { snapToGrid: true }
            ),
          },
        ])
      );
    }
  };

  return (
    <div className="fixed z-50 left-12 w-[calc(100vw-40px)] h-[calc(100vh-80px)] bg-gray-100 flex">
      <FlowNodeTree />
      <div
        className="w-full h-full"
        onDragOver={(ev) => ev.preventDefault()}
        onDrop={handleDropFlowNode}
      >
        <ReactFlow
          className="w-full h-full overview"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          colorMode={theme}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function EditFlow() {
  return (
    <ReactFlowProvider>
      <BaseEditFlow />
    </ReactFlowProvider>
  );
}
