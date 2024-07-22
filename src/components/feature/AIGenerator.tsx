import { useCallback, useState } from 'react'
import { FloatButton, Modal, Form, Input, message } from 'antd'
import { Wand } from 'lucide-react'
import AILoading from '@/components/ui/AILoading'
import { trpcClientReact } from '@/utils/apis'
import { parseJSONWithCatch } from '@/lib/utils'
import { useDispatch } from 'react-redux'
import aiParser from '@/lib/aiParser'
import { changeForm, resetComponents } from '@/store/componentReducer'

export default function AIGenerator() {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { mutate: generateQuestion } = trpcClientReact.llm.questionGenerate.useMutation({
    onSuccess: (res: string) => {
      let aiRes = res;
      const matchRes = aiRes.match(/(?<=```json\n)([\s\S]*?)(?=\n```)/);
      if (matchRes && matchRes.length > 0) {
        aiRes = matchRes[0]
      }
      const questionRes = parseJSONWithCatch(aiRes, undefined)
      if (!questionRes) {
        setLoading(false)
        message.error('AI生成失败，请稍后再试')
        return
      }
      dispatch(resetComponents(aiParser.runner(questionRes)))
      dispatch(changeForm({
        props: {
          layout: 'vertical',
          labelAlign: 'left',
          labelCol: {
            span: 24
          }
        } as any
      }))
      setLoading(false)
      setVisible(false)
      form.resetFields()
      message.success('表单生成成功!')
    },
    onError(err: any) {
      setLoading(false)
      message.error(err.message || 'AI生成失败，请稍后再试')
    },
  })

  const handleAIGenerate = useCallback(() => {
    const prompt = form.getFieldValue('prompt')
    setLoading(true)
    generateQuestion(prompt)
  }, [form, generateQuestion, setLoading])

  return (<>
    <FloatButton type="primary" icon={<Wand />} style={{right: '24px', bottom: '108px'}} tooltip="AI" onClick={() => setVisible(true)} />
    <Modal
      open={visible}
      title={<div className='flex items-center'>
        <Wand color={'rgb(14, 165, 233)'} className='mr-2' />AI快速生成你的问卷
      </div>}
      okText="立即生成"
      maskClosable={false}
      okButtonProps={{
        loading: loading,
      }}
      onOk={handleAIGenerate}
      onCancel={() => setVisible(false)}
      styles={{body: {
        position: 'relative',
      }}}
    >
      <Form form={form}>
        <Form.Item name='prompt'>
          <Input.TextArea className='w-full !h-96' placeholder='请输入您的问卷需求...' />
        </Form.Item>
      </Form>
      {
        loading
          ? (<div className='absolute inset-0 z-[5005] overflow-hidden'>
            <AILoading text={'AI正在帮您生成问卷中...'} />
          </div>)
          : null
      }
    </Modal>
  </>)
}