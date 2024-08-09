"use client";

import EditLeftPanel from "./components/EditorLeftPanel";
import EditCanvas from "./components/EditCanvas";
import EditRightPanel from "./components/EditRightPanel";
import EditHeader from "./components/EditHeader";
import useLoadProject from "@/hooks/useLoadProject";
import { Spin } from "antd";
import AIGenerator from "@/components/feature/AIGenerator";
import { useDispatch } from "react-redux";
import { selectComponent } from "@/store/componentReducer";

export default function EditPage({ params }: { params: { id: string } }) {
  const { loading } = useLoadProject(params.id);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="w-full h-full bg-slate-100 flex justify-center items-center dark:bg-gray-900">
        <Spin />
      </div>
    );
  }

  const clearSelectedId = () => {
    dispatch(selectComponent(""));
  };

  return (
    <>
      <div className="w-full h-full bg-slate-100">
        <div className="flex h-[80px] shadow-md bg-white items-center px-4 border-solid border border-slate-100 relative z-50 dark:bg-gray-950 dark:border-gray-800">
          <EditHeader />
        </div>
        <div className="flex w-full h-[calc(100vh-80px)]">
          <div className="left-section w-[330px] bg-white shadow-md pr-4 overflow-auto dark:bg-gray-950">
            <EditLeftPanel />
          </div>
          <div
            className="main-content flex-1 h-full flex items-center justify-center overflow-auto py-8 dark:bg-gray-800 relative z-10"
            onClick={clearSelectedId}
          >
            <EditCanvas />
          </div>
          <div className="right-setter w-[330px] bg-white shadow-md p-4 overflow-auto dark:bg-gray-950">
            <EditRightPanel />
          </div>
        </div>
      </div>
      <AIGenerator />
    </>
  );
}
