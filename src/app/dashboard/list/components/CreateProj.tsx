import { Modal, Form, Input, message } from 'antd'
import { trpcClientReact } from '@/utils/apis'
import { useState } from 'react'
import { useRouter } from 'next-nprogress-bar'

interface CreateProjProps {
  visible: boolean
  onCancel: () => void
}
export default function CreateProj(props: CreateProjProps) {
  const { visible, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const router = useRouter()
  const { mutate } = trpcClientReact.project.createProject.useMutation()

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true)
      mutate(values, {
        onSuccess(data) {
          message.success('创建问卷成功!')
          setLoading(false)
          router.push(`/edit/${data.id}`)
          onCancel()
        },
        onError(err) {
          console.log(err)
          message.error('创建问卷失败!')
          setLoading(false)
        }
      })
    })
  }

  return (<Modal
    open={visible}
    title="新建问卷"
    centered
    okText="创建"
    onCancel={onCancel}
    onOk={handleSubmit}
    okButtonProps={{ loading }}
  >
    <Form form={form}>
      <Form.Item label="问卷名称" name='name' rules={[{ required: true, message: '请输入问卷名称' }]}>
        <Input placeholder='请输入问卷名称' />
      </Form.Item>
      <Form.Item label="问卷描述" name='description' rules={[{ required: true, message: '请输入问卷描述' }]}>
        <Input.TextArea placeholder='请输入问卷名称' />
      </Form.Item>
    </Form>
  </Modal>)
}