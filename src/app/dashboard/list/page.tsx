'use client'
import { useState } from 'react'
import { Button, Tabs } from 'antd'
import ProjectList from './components/ProjectList'
import TrashTable from './components/TrashTable'
import CreateProj from './components/CreateProj'

export default function DashboardListPage() {
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [activeTab, setActiveTab] = useState('my-forms')

  return (<>
    <div className='container w-full h-full'>
      <Tabs
        accessKey={activeTab}
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
  </>);
}