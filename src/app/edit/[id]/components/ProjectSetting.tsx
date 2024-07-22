import { changeConfig } from '@/store/project'
import { trpcClientReact } from '@/utils/apis'
import { Modal, Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import useGetProject from '@/hooks/useGetProject'

interface ProjectSettingProps {
  visible: boolean
  onClose: () => void
}
export default function ProjectSetting(props: ProjectSettingProps) {
  const { visible, onClose } = props
  const dispatch = useDispatch()
  const { id, config } = useGetProject()
  const { mutate: changeProject } = trpcClientReact.project.changeProject.useMutation({
    onSuccess: () => {
      message.success('项目配置保存成功.')
      onClose()
    },
    onError: () => {
      message.error('项目配置保存失败，请稍后重试.')
    }
  });

  const changeProjectConfig = (_: Record<string, any>, values: Record<string, any>) => {
    dispatch(changeConfig(values))
  }

  const saveProjectConfig = () => {
    changeProject({
      id,
      config: JSON.stringify(config)
    })
  }

  return (<Modal open={visible} title="表单页面设置" okText="保存" onOk={saveProjectConfig} onCancel={onClose}>
    <Form initialValues={config} onValuesChange={changeProjectConfig}>
      <Form.Item label="表单名称" name='title'>
        <Input placeholder='请输入表单名称' />
      </Form.Item>
    </Form>
  </Modal>)
}