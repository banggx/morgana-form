import { useState } from 'react'
import { Button, Card, Tooltip, Pagination, Spin, Empty, Modal, message } from 'antd'
import { trpcClientReact } from '@/utils/apis'
import { Project } from '@/typings/project'
import { Cog, AreaChart, Trash, Star, Cloud, Info } from 'lucide-react'
import { useRouter } from 'next-nprogress-bar'

export function ProjectCard(props: { project: Project, updateProject: (id: string, data: Partial<Project>) => void, refetch: (opts?: any) => Promise<any> }) {
  const { project, updateProject, refetch } = props
  const router = useRouter()
  const { mutateAsync: changeProject } = trpcClientReact.project.changeProject.useMutation()
  const { mutateAsync: deleteProject } = trpcClientReact.project.deleteProject.useMutation()

  const starProject = () => {
    changeProject({
      id: project.id,
      isStar: !project.isStar
    }).then(() => {
      updateProject(project.id, { isStar: !project.isStar})
      message.success('星标成功')
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
    <div className='text-lg font-medium text-slate-700 dark:text-slate-300'>{project.name}</div>
    <div className='leading-snug text-slate-500 text-sm'>{project.description}</div>
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
    </div>
  </Card>)
}

export default function ProjectList(props: { filters?: Partial<Project> } ) {
  const pageLimit = 12
  const [page, setPage] = useState(1)
  const listQuery = {
    limit: pageLimit,
    page: page,
    filter: props.filters
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

  return (<div className='w-full h-full'>
    <div className='w-full h-full relative grid grid-cols-4 gap-4'>
      {
        data && data.items.map(project => <ProjectCard key={project.id} project={project as Project} updateProject={updateProject} refetch={refetch} />)
      }
      {
        isPending && <div className='min-h-[100px] absolute z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-white bg-opacity-50 dark:bg-gray-800/[0.1]'>
          <Spin />
        </div>
      }
    </div>
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