import { useCallback, useEffect, createContext } from 'react'
import { Form, Button, message } from 'antd'
import styleParser from '@/lib/styleParser'
import RenderItem from './RenderItem'
import { useSetFormConfig } from '@/hooks/useSetFormConfig'
import { useUserAgentInfo } from '@/hooks/useUserAgentInfo'
import { useCheckAlreadySubmit } from '@/hooks/useCheckAlreadySubmit'
import { trpcClientReact } from '@/utils/apis'
import { getFingerPrintID } from '@/utils/tools'
import { CheckCircle } from 'lucide-react'
import FlowAction from '@/lib/flowAction'
import type { ComponentInfoType, FormInfoType } from "@/typings/model"
import { ComponentSourceHandle, type GraphNode } from '@/typings/graph'
import { FormInstance } from 'antd/lib'

interface FormRenderProps {
  id: string;
  versionId?: string | null;
  schema: {
    components?: ComponentInfoType[]
    form: FormInfoType
    flow: null | Record<string, GraphNode>
  },
  config?: string;
}
export const formRenderContext = createContext<{ flowAction: FlowAction | null, form: FormInstance } | null>(null)
export default function FormRender(props: FormRenderProps) {
  const { id, versionId, schema, config } = props
  const { components = [], form = {}, flow = null } = schema
  const { loading, hasSubmit, setHasSubmit } = useCheckAlreadySubmit(id, versionId)
  const { ip, ua } = useUserAgentInfo()
  const [formRef] = Form.useForm();
  const flowAction = flow ? FlowAction.getInstance(flow, formRef) : null
  useSetFormConfig(config || '')

  const { mutate: submitForm } = trpcClientReact.form.submitForm.useMutation({
    onSuccess: () => {
      message.success('表单提交成功')
      setHasSubmit(true)
    },
    onError: (error) => {
      message.error(error.message || '表单提交失败，请稍后再试')
    }
  })

  const submitFormHandler = useCallback(async (values: Record<string, any>) => {
    if (!versionId) {
      message.warning('预览项目，无法提交表单')
      return
    }
    const fingerId = await getFingerPrintID()
    submitForm({
      formId: id,
      finger: fingerId,
      versionId: versionId,
      data: JSON.stringify(values),
      ip: ip || '',
      browser: ua.browserName,
      browserVersion: ua.browserVersion,
      os: ua.osName,
      osVersion: ua.osVersion
    })
  }, [versionId, id, ua, ip])

  const formValuesChangeHandler = useCallback((changeValue: Record<string, any>) => {
    for (const key in changeValue) {
      flowAction?.trigger(key, ComponentSourceHandle.change, changeValue[key])
    }
  }, [flowAction])

  useEffect(() => {
    if (!flowAction) return
    // 初始化跑一遍组件的change flow
    const formData = formRef.getFieldsValue()
    for (const key in formData) {
      flowAction?.trigger(key, ComponentSourceHandle.change, formData[key])
    }
  }, [])

  if (hasSubmit) {
    return <div className='flex flex-col items-center h-full text-center text-gray-500 py-12'>
      <CheckCircle size={64} color="rgb(34 197 94)" />
      <div className='mt-8 text-sm'>您已完成此次提交，感谢您的参与！</div>
    </div>
  }

  const formCommonStyle = styleParser.runner(form.commonStyle || {})
  return <div className='max-w-2xl m-auto pb-12' style={formCommonStyle}>
    <formRenderContext.Provider value={{ flowAction, form: formRef }}>
      <Form form={formRef} {...form.props} onValuesChange={flowAction ? formValuesChangeHandler : undefined} onFinish={submitFormHandler}>
        {
          components.filter((component: ComponentInfoType) => !component.isHidden)
            .map((component: ComponentInfoType) => <RenderItem key={component.id} component={component} />)
        }
        <div className='flex justify-center'>
          <Button type="primary" htmlType="submit" block className='!w-8/12' disabled={loading || hasSubmit}>提交表单</Button>
        </div>
      </Form>
    </formRenderContext.Provider>
  </div>
}