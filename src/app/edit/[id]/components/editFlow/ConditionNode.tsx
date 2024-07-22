import { Handle, Position, useReactFlow } from '@xyflow/react'
import { Form, Input } from 'antd'
import { HANDLE_DOT_STYLE } from './constants'
import { ConditionTargetHandle, ConditionSourceHandle } from '@/typings/graph'
 
export default function ConditionNode({ id, data }: { id: string; data: Record<string, any> }) {
  const reactFlow = useReactFlow()
  
  const updateCondition = (_: any, values: Record<string, any>) => {
    reactFlow.updateNodeData(id, values)
  }
  
  return (<div className="border border-solid border-slate-300 rounded-md min-w-28 font-sans bg-slate-100 shadow-md dark:bg-slate-600 dark:border-slate-500">
      <div className="component-title text-sm text-center leading-normal font-medium bg-red-600 px-4 py-1 text-slate-200 rounded-t-md">
        条件节点
      </div>
      <Handle
        type="target"
        id={ConditionTargetHandle.source}
        position={Position.Left}
        style={HANDLE_DOT_STYLE}
      />
      <div className='py-2 pl-2 pr-10'>
        <Form
          size="small"
          variant='filled'
          layout='vertical'
          initialValues={data}
          onValuesChange={updateCondition}
        >
          <Form.Item label="表达式" name="condition">
            <Input className='!w-32' placeholder='请输入条件表达式，如 "=",">=","<=" 等' />
          </Form.Item>
          <Form.Item label="条件值" name="value">
            <Input className='!w-32' placeholder='请输入条件值' />
          </Form.Item>
        </Form>
      </div>
      <div className='absolute right-0 top-1/2 transform -translate-y-1/2'>
        <div className='relative'>
          <Handle
            type="source"
            position={Position.Right}
            id={ConditionSourceHandle.True}
            style={HANDLE_DOT_STYLE}
          />
          <label className="text-xs text-slate-600 relative -left-1" htmlFor={ConditionSourceHandle.True}>True</label>
        </div>
        <div className='relative mt-4 flex items-center'>
          <Handle
            type="source"
            position={Position.Right}
            id={ConditionSourceHandle.False}
            style={HANDLE_DOT_STYLE}
          />
          <label className="text-xs text-slate-600 relative -left-1" htmlFor={ConditionSourceHandle.False}>False</label>
        </div>
      </div>
    </div>)
}