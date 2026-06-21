import { useState } from 'react'
import { Button, Card, Tooltip, Pagination, Spin, Empty, Modal, message, Tag, Checkbox } from 'antd'
import { trpcClientReact } from '@/utils/apis'
import { Project } from '@/typings/project'
import { Cog, AreaChart, Trash, Star, Cloud, Info } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

export function ProjectCard(props: { project: Project, updateProject: (id: string, data: Partial<Project>) => void, refetch: (opts?: any) => Promise<any>, isSelected: boolean, onSelect: (id: string, checked: boolean) => void }) {
  const { project, updateProject, refetch, isSelected, onSelect } = props
  const router = useRouter()
  const { mutateAsync: changeProject } = trpcClientReact.project.changeProject.useMutation()
  const { mutateAsync: deleteProject } = trpcClientReact.project.deleteProject.useMutation()

  const starProject = () => {
    changeProject({
      id: project.id,
      isStar: !project.isStar
    }).then(() => {
      updateProject(project.id, { isStar: !project.isStar})
      message.success(!project.isStar ? '星标成功' : '取消星标成功')
    })
  }

  const deleteProjectHandle = () => {
    Modal.confirm({
      title: '确认删除?',
      icon: <Info color='rgb(6 182 212)' className='mr-2' />,
      content: '项目删除后可以从回收站进行恢复或者永久删除，确认继续?',
      okText: '删除',
      onOk() {
        deleteProject(project.id)
          .then(() => {
            message.success('删除成功')
            refetch()
          })
      }
    })
  }

  return (<Card className='w-full relative'
    actions={[
      <Button key='edit' type='text' onClick={() => router.push(`/edit/${project.id}`)} size='small'>
        <Tooltip title="编辑"><Cog size={20} className='m-auto' /></Tooltip>
      </Button>,
      <Button key='statistic' type='text' disabled={!project.isPublish} onClick={() => router.push(`/statistic/${project.id}`)} size='small'>
        <Tooltip title="数据"><AreaChart size={20} className='m-auto' /></Tooltip>
      </Button>,
      <Button key='star' type='text' size='small' onClick={starProject}>
        <Tooltip title="星标"><Star color={project.isStar ? '#facc15' : undefined} size={20} className='m-auto' /></Tooltip>
      </Button>,
      <Button key='delete' type='text' size='small' onClick={deleteProjectHandle}>
        <Tooltip title="删除"><Trash size={20} className='m-auto' /></Tooltip>
      </Button>
    ]}
  >
    <div className='flex items-start'>
      <Checkbox 
        className='mr-2 mt-1'
        checked={isSelected}
        onChange={(e) => onSelect(project.id, e.target.checked)}
      />
      <div>
        <div className='text-lg font-medium text-slate-700 dark:text-slate-300'>{project.name}</div>
        <div className='leading-snug text-slate-500 text-sm'>{project.description}</div>
      </div>
    </div>
    <div className='absolute top-0 right-0 flex items-center rounded-es-md rounded-se-md overflow-hidden'>
      {
        project.isStar && <div className='p-1 bg-yellow-400 text-white'>
          <Star size={16} />
        </div>
      }
      {
        project.isPublish && <div className='p-1 bg-green-500 text-white'>
          <Cloud size={16} />
        </div>
      }
      {
        project.archived && <Tag color='default' className='ml-1'>已归档</Tag>
      }
    </div>
  </Card>)
}

export default function ProjectList(props: { filters?: Partial<Project>, archivedFilter?: boolean | null } ) {
  const pageLimit = 12
  const [page, setPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const listQuery = {
    limit: pageLimit,
    page: page,
    filter: {
      ...props.filters,
      ...(props.archivedFilter !== undefined ? { archived: props.archivedFilter } : {})
    }
  }
  const { data, isPending, refetch } = trpcClientReact.project.listProjects.useQuery(listQuery, {
    refetchOnMount: true,
  })
  const utils = trpcClientReact.useUtils()
  const updateProject = (id: string, data: Partial<Project>) => {
    utils.project.listProjects.setData(listQuery, (prev) => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        items: prev.items.map((item, index) => {
          if (item.id === id) {
            return {
              ...item,
              ...data
            }
          }
          return item
        })
      }
    })
  }

  const { mutateAsync: archiveProjects } = trpcClientReact.project.archiveProjects.useMutation({
    onSuccess: () => {
      message.success('项目归档成功')
      refetch()
      setSelectedRows([])
    }
  })

  const { mutateAsync: restoreProjects } = trpcClientReact.project.restoreProjects.useMutation({
    onSuccess: () => {
      message.success('项目恢复成功')
      refetch()
      setSelectedRows([])
    }
  })

  const archiveHandler = (ids: string[], callback?: () => void) => {
    Modal.confirm({
      title: '确认归档选中项目？',
      content: '归档后项目将移至【已归档】Tab，仍可恢复，确认继续？',
      icon: <Info color='rgb(6 182 212)' className='mr-2' />,
      okText: '归档',
      onOk() {
        archiveProjects(ids).then(callback)
      }
    })
  }

  const restoreHandler = (ids: string[], callback?: () => void) => {
    Modal.confirm({
      title: '确认恢复选中项目？',
      content: '恢复后项目将移至【我的问卷】Tab，确认继续？',
      icon: <Info color='rgb(6 182 212)' className='mr-2' />,
      okText: '恢复',
      onOk() {
        restoreProjects(ids).then(callback)
      }
    })
  }

  const batchArchiveHandler = () => {
    archiveHandler(selectedRows, () => setSelectedRows([]))
  }

  const batchRestoreHandler = () => {
    restoreHandler(selectedRows, () => setSelectedRows([]))
  }

  return (<div className='w-full h-full'>
    <div className='w-full h-full relative grid grid-cols-4 gap-4'>
      {
        data && data.items.map(project => <ProjectCard 
          key={project.id} 
          project={project as Project} 
          updateProject={updateProject} 
          refetch={refetch}
          isSelected={selectedRows.includes(project.id)}
          onSelect={(id, checked) => {
            if (checked) {
              setSelectedRows(prev => [...prev, id])
            } else {
              setSelectedRows(prev => prev.filter(item => item !== id))
            }
          }}
        />)
      }
      {
        isPending && <div className='min-h-[100px] absolute z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-white bg-opacity-50 dark:bg-gray-800/[0.1]'>
          <Spin />
        </div>
      }
    </div>
    {
      selectedRows.length > 0 && (
        <div className='w-full flex justify-end mb-4'>
          <div className='flex items-center'>
            <span className='mr-2'>已选择 {selectedRows.length} 个项目</span>
            {
              props.archivedFilter === true 
                ? <Button type="primary" onClick={batchRestoreHandler}>恢复</Button>
                : <Button type="primary" onClick={batchArchiveHandler}>批量归档</Button>
            }
          </div>
        </div>
      )
    }
    {
      data?.total
        ? <div className='mt-6'>
            <Pagination align="center" defaultCurrent={page} pageSize={pageLimit} total={data?.total} onChange={(page) => setPage(page)} />
          </div>
        : <Empty
            className='w-full flex flex-col items-center py-12'
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
          ></Empty>
    }
  </div>)
}