import { Tabs } from 'antd'
import FormTable from './FormTable'
import GlobalStatistic from './GlobalStatistic'

const StatisticPanelTabs = [
  {
    key: 'form-data',
    label: '表单数据',
    children: <FormTable />
  },
  {
    key: 'global-statistic',
    label: '数据统计',
    children: <GlobalStatistic />
  }
]

export default function StatisticPanel() {
  return <Tabs items={StatisticPanelTabs} type="card" className='w-full h-full'></Tabs>
}