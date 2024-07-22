import { Tabs, Tooltip } from 'antd'
import ComponentTree from './ComponentTree'
import ComponentLayer from './ComponentLayer'
import EditFlow from './editFlow/EditFlow'
import { Component, Layers, Workflow } from 'lucide-react'

const leftPanelTabs = [
  {
    key: 'components',
    label: <Tooltip title='组件列表'><Component /></Tooltip>,
    children: <ComponentTree />
  },
  {
    key: 'layers',
    label: <Tooltip className='组件图层'><Layers /></Tooltip>,
    children: <ComponentLayer />
  },
  {
    key: 'workflow',
    label: <Tooltip title='工作流'><Workflow /></Tooltip>,
    children: <EditFlow />
  }
]
export default function EditLeftPanel() {
  return <Tabs
    tabPosition='left'
    className='w-full h-full'
    items={leftPanelTabs}
  ></Tabs>
}