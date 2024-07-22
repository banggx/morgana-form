import { useState } from 'react'
import { Table, Tag, Space, Button, Modal, message } from 'antd'
import { Info } from 'lucide-react'
import dayjs from 'dayjs'
import { trpcClientReact } from '@/utils/apis'
import type { ColumnsType } from 'antd/es/table'
import type { Project } from '@/typings/project'
import type { Key } from 'antd/es/table/interface'

const TrashProjectColumn: ColumnsType<Project> = [
  {
    key: 'name',
    dataIndex: 'name',
    title: '项目名称',
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: '项目描述',
  },
  {
    key: 'isStar',
    dataIndex: 'isStar',
    title: '星标',
    render: (isStar: boolean) => <Tag color={ isStar ? 'green' : 'default' }>{isStar ? '是' : '否'}</Tag>
  },
  {
    key: 'isPublish',
    dataIndex: 'isPublish',
    title: '发布',
    render: (isPublish: boolean) => <Tag color={ isPublish ? 'green' : 'default' }>{isPublish ? '已发布' : '未发布'}</Tag>
  },
  {
    key: 'deletedAt',
    dataIndex: 'deletedAt',
    title: '删除时间',
    render: (deletedAt: string) => dayjs(deletedAt).format('YYYY-MM-DD HH:mm:ss')
  }
]
export default function TrashTable() {
  const pageLimit = 12
  const [page, setPage] = useState(1)
  const listQuery = {
    limit: pageLimit,
    page: page,
  }
  const { data, isPending, refetch } = trpcClientReact.project.listTrashProjects.useQuery(listQuery, {
    refetchOnMount: true
  })
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const { mutateAsync: recoverProjects } = trpcClientReact.project.recoverProjects.useMutation({
    onSuccess: () => {
      message.success('数据恢复成功')
      refetch()
    }
  })
  const { mutateAsync: hardDeleteProjects } = trpcClientReact.project.hardDeleteProjects.useMutation({
    onSuccess: () => {
      message.success('数据删除成功')
      refetch()
    }
  })

  const recoverHandler = (ids: string[], callback?: () => void) => {
    Modal.confirm({
      title: '确认恢复选中数据？',
      content: '数据恢复后可在【我的问卷】中查看和编辑问卷，确认继续',
      icon: <Info color='rgb(6 182 212)' className='mr-2' />,
      okText: '恢复',
      onOk() {
        recoverProjects(ids).then(callback)
      }
    })
  }

  const hardDeleteHandler = (ids: string[], callback?: () => void) => {
    Modal.confirm({
      title: '确认永久删除选中数据？',
      content: '永久删除后，数据将不可恢复，确认继续？',
      icon: <Info color='rgb(239 68 68)' className='mr-2' />,
      okText: '永久删除',
      onOk() {
        hardDeleteProjects(ids).then(callback)
      }
    })
  }

  const bacthRecoverHandler = () => {
    recoverHandler(selectedRows, () => setSelectedRows([]))
  }

  const bacthHardDeleteHandler = () => {
    hardDeleteHandler(selectedRows, () => setSelectedRows([]))
  }
  
  const tableColumn = TrashProjectColumn.concat([
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '操作',
      render: (_: any, record: Project) => (<Space>
        <div className='cursor-pointer text-cyan-600' onClick={() => recoverHandler([record.id])}>恢复</div>
        <Button type="link" danger onClick={() => hardDeleteHandler([record.id])}>永久删除</Button>
      </Space>) 
    }
  ])

  return <div>
    {
      selectedRows.length > 0
        ? (<div className='w-full flex justify-end mb-4'>
            <Space>
              <Button type="primary" onClick={bacthRecoverHandler}>数据恢复</Button>
              <Button type="primary" danger onClick={bacthHardDeleteHandler}>永久删除</Button>
            </Space>
          </div>)
        : null
    }
    <Table
      columns={tableColumn}
      dataSource={data?.items as Project[]}
      loading={isPending}
      rowKey={'id'}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: (selected: Key[]) => setSelectedRows(selected as string[]),
      }}
    />
  </div>
}