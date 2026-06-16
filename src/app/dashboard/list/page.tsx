'use client'
import { useState } from 'react'
import { Button, Tabs } from 'antd'
import ProjectList from './components/ProjectList'
import TrashTable from './components/TrashTable'
import CreateProj from './components/CreateProj'
import { useQueryClient } from '@tanstack/react-query'
import { trpcClientReact } from '@/utils/apis'

export default function DashboardListPage() {
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [activeTab, setActiveTab] = useState('my-forms')
  const queryClient = useQueryClient()

  // Refetch on tab change to ensure fresh data
  useEffect(() => {
    if (activeTab === 'my-forms') {
      queryClient.invalidateQueries({ queryKey: ['listVersionForms'] })
    }
  }, [activeTab, queryClient])

  return (
    <>
      <div className='container w-full h-full'>
        <Tabs 
          activeKey={activeTab}
          type='card' 
          tabBarExtraContent={{ 
            right: <Button type="primary" onClick={() => setVisibleCreate(true)}>创建项目</Button> 
          }} 
          className='w-full h-full' 
          destroyInactiveTabPane={true} 
          onChange={(key) => setActiveTab(key)} 
        >
          <Tabs.TabPane tab="我的问卷" key="my-forms" tabKey='my-forms'>
            <ProjectList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="星标问卷" key="star-forms" tabKey='star-forms'>
            <ProjectList filters={{ isStar: true }} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="回收站" key="trash-forms" tabKey='trash-forms'>
            <TrashTable />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <CreateProj visible={visibleCreate} onCancel={() => setVisibleCreate(false)} />
    </>
  );
}
