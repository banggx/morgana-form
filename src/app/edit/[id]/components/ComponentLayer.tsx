import { useState } from "react";
import { Button, Space, Input } from "antd";
import SortableContainer from "@/components/feature/DragSortable/SortableContainer";
import SortableItem from "@/components/feature/DragSortable/SortableItem";
import Empty from "@/components/ui/Empty";
import useGetComponents from "@/hooks/useGetComponents";
import { LockKeyhole, EyeOff, EditIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  moveComponent,
  selectComponent,
  toggleHidden,
  toggleLocked,
  changeComponentName,
} from "@/store/componentReducer";
import { cn } from "@/lib/utils";

import type { ComponentInfoType } from "@/typings/model";

export default function ComponentLayer() {
  const { components, selectedId } = useGetComponents();
  const dispatch = useDispatch();
  const [editId, setEditId] = useState<string | null>(null);

  const handleHidden = (ev: React.MouseEvent, component: ComponentInfoType) => {
    ev.stopPropagation();
    dispatch(
      toggleHidden({
        id: component.id,
        isHidden: !component.isHidden,
      })
    );
  };

  const handleLock = (ev: React.MouseEvent, component: ComponentInfoType) => {
    ev.stopPropagation();
    dispatch(
      toggleLocked({
        id: component.id,
      })
    );
  };

  const handleEditComponent = (
    ev: React.MouseEvent,
    component: ComponentInfoType
  ) => {
    ev.stopPropagation();
    setEditId(component.id);
  };

  const selectNode = (id: string) => {
    dispatch(selectComponent(id));
  };

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }));
  };

  const handleUpdateComponentName = (
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = ev.currentTarget.value;
    if (value.trim()) {
      dispatch(
        changeComponentName({
          id: editId!,
          name: value.trim(),
        })
      );
    }
    setEditId(null);
  };

  if (!components.length) {
    return <Empty className="py-3" content="暂未添加表单组件"></Empty>;
  }

  return (
    <div className="py-3">
      <SortableContainer items={components} onDragEnd={handleDragEnd}>
        {components.map((component) => {
          return (
            <SortableItem id={component.id} key={component.id}>
              <div
                key={component.id}
                className={cn(
                  "w-full h-10 border border-gray-100 border-solid rounded-md flex items-center justify-between mb-2 px-4 shadow-sm cursor-pointer dark:border-slate-500",
                  {
                    "bg-cyan-600 text-slate-50 dark:bg-slate-500":
                      component.id === selectedId,
                    "px-0": editId === component.id,
                  }
                )}
                onClick={() => selectNode(component.id)}
              >
                {editId === component.id ? (
                  <Input
                    autoFocus
                    defaultValue={component.name}
                    placeholder="请输入组件名称"
                    className="h-full"
                    onClick={(ev) => ev.stopPropagation()}
                    onPressEnter={handleUpdateComponentName}
                  />
                ) : (
                  <>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap mr-2">
                      {component.name}
                    </div>
                    <Space className="operation-btns flex items-center">
                      <Button
                        icon={<EditIcon size={14} />}
                        shape="circle"
                        size="small"
                        onClick={(ev) => handleEditComponent(ev, component)}
                      />
                      <Button
                        type={component.isLocked ? "primary" : "default"}
                        icon={<LockKeyhole size={14} />}
                        shape="circle"
                        size="small"
                        onClick={(ev) => handleLock(ev, component)}
                      />
                      <Button
                        type={component.isHidden ? "primary" : "default"}
                        icon={<EyeOff size={14} />}
                        shape="circle"
                        size="small"
                        onClick={(ev) => handleHidden(ev, component)}
                      />
                    </Space>
                  </>
                )}
              </div>
            </SortableItem>
          );
        })}
      </SortableContainer>
    </div>
  );
}
