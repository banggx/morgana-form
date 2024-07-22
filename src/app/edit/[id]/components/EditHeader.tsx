import { useState } from 'react'
import { Button, Modal, Space, message } from 'antd'
import { ArrowLeft, Info } from 'lucide-react'
import TitleElem from './TitleElem'
import Toolbox from './Toolbox'
import ProjectSetting from './ProjectSetting'
import usePublishProject from '@/hooks/usePublishProject'
import { useRouter } from 'next-nprogress-bar'

export default function EditHeader() {
  const router = useRouter()
  const publishProject = usePublishProject()
  const [visibleProjectSetting, setVisibleProjectSetting] = useState(false)

  const publishProjectHandler = () => {
    Modal.confirm({
      title: <div className='flex items-center'>
        <Info size={18} color='rgb(6 182 212)' className='mr-2' />
        上线提示
      </div>,
      icon: null,
      content: '项目上线后即可开始表单数据搜集，后续可持续对表单进行更新调整，但每次调整上线的表单数据将产生新的编号并隔离，确认上线吗？',
      onOk() {
        const loadingIns = message.loading('发布中...')
        return publishProject().finally(() => {
          loadingIns()
        })
      }
    })
  }

  return (<>
    <div className='w-full flex justify-between items-center relative'>
      <div className='flex items-center'>
        <Button
          type='link'
          size="small"
          icon={<ArrowLeft size={20} />}
          className='mr-4'
          onClick={() => router.back()}
        ></Button>
        <TitleElem />
      </div>
      <div className='absolute left-1/2 -translate-x-1/2'>
        <Toolbox />
      </div>
      <div>
        <Space>
          <Button onClick={() => setVisibleProjectSetting(true)}>设置</Button>
          <Button type="primary" onClick={publishProjectHandler}>发布</Button>
        </Space>
      </div>
    </div>
    <ProjectSetting visible={visibleProjectSetting} onClose={() => setVisibleProjectSetting(false)} />
  </>)
}