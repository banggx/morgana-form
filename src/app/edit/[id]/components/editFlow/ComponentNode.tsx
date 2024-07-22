import { Handle, Position } from '@xyflow/react'
import useGetComponentById from "@/hooks/useGetComponentById"
import { Divider } from 'antd'
import { HANDLE_DOT_STYLE } from './constants'
import { ComponentSourceHandle, ComponentTargetHandle } from '@/typings/graph'
import { ComponentGroup, getComponentInfoByType } from '@morgana/components'

interface ComponentNodeProps {
  fromId: string;
}
export default function ComponentNode(props: { data: ComponentNodeProps }) {
  const { fromId } = props.data
  const component = useGetComponentById(fromId)

  if (!component) {
    return null
  }
  const componentMeta = getComponentInfoByType(component?.type)?.meta

  return <div className="border border-solid border-slate-300 rounded-md min-w-28 font-sans bg-slate-100 shadow-md dark:bg-slate-600 dark:border-slate-500">
    <div className="component-title text-sm text-center leading-normal font-medium bg-slate-800 px-4 py-1 text-slate-200 rounded-t-md">{component.name}</div>
    <div className="target-node-wrap mt-2">
      <div className="target-node-item relative px-2 py-1 text-xs leading-normal text-slate-600 dark:text-slate-300">
        <Handle
          id={ComponentTargetHandle.visible}
          type="target"
          position={Position.Left}
          style={HANDLE_DOT_STYLE}
        />
        显隐
      </div>
      {
        componentMeta?.group === ComponentGroup.form
          ? <div className="target-node-item relative px-2 py-1 text-xs leading-normal text-slate-600 dark:text-slate-300">
              <Handle
                id={ComponentTargetHandle.change}
                type="target"
                position={Position.Left}
                style={HANDLE_DOT_STYLE}
              />
              数据更新
            </div>
          : null
      }
    </div>
    <Divider className='!my-1' />
    <div className='text-right'>
      <div className='relative target-node-item px-2 py-1 text-xs leading-normal text-slate-600 dark:text-slate-300'>
        <Handle
          id={ComponentSourceHandle.click}
          type="source"
          position={Position.Right}
          style={HANDLE_DOT_STYLE}
        />
        点击
      </div>
      {
        componentMeta?.group === ComponentGroup.form
          ? <div className='relative target-node-item px-2 py-1 text-xs leading-normal text-slate-600 dark:text-slate-300'>
              <Handle
                id={ComponentSourceHandle.change}
                type="source"
                position={Position.Right}
                style={HANDLE_DOT_STYLE}
              />
              数据变更
            </div>
          : null
      }
    </div>
  </div>
}