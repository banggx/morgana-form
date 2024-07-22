import { Tabs } from 'antd'
import PropsSetter from './PropsSetter'
import StyleSetter from './StyleSetter'

const rightPanelTabs = [
  {
    key: 'props',
    label: '数据',
    children: <PropsSetter />
  },
  {
    key: 'style',
    label: '样式',
    children: <StyleSetter />
  }
]

export default function EditRightPanel() {
  return (<Tabs type="card" size="small" items={rightPanelTabs}></Tabs>)
}