import { useState } from 'react'
import { Button, Select } from 'antd'
import { ArrowLeft, Rocket } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next-nprogress-bar'
import useGetProject from '@/hooks/useGetProject'
import useGetVersion from '@/hooks/useGetVersion'
import PreviewLink from './PreviewLink'
import { trpcClientReact } from '@/utils/apis'
import { resetVersion } from '@/store/version'
import type { Version } from '@/typings/version'

export default function EditHeader() {
  const router = useRouter()
  const { name, id } = useGetProject()
  const version = useGetVersion()
  const dispatch = useDispatch()
  const { data: versions, isPending } = trpcClientReact.version.getProjectVersions.useQuery({ projectId: id }, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const [editVersion, setEditVersion] = useState(false)

  const toggleCurrentVersion = (id: string) => {
    const version = versions?.find(v => v.id === id) as Version
    dispatch(resetVersion(version))
    setEditVersion(false)
  }

  return (<>
    <div className='w-full flex justify-between items-center relative'>
      <div className='flex items-center'>
        <Button
          type='link'
          size="small"
          icon={<ArrowLeft size={20} />}
          className='mr-4'
          onClick={() => router.replace('/dashboard/list')}
        ></Button>
        <div className='text-xl font-medium text-slate-600 dark:text-slate-300'>{name}</div>
      </div>
      <div className='absolute left-1/2 -translate-x-1/2'>
        <PreviewLink />
      </div>
      {
        !editVersion
          ? (<div className='text-2xl font-bold text-cyan-600 font-mono flex items-center cursor-pointer' onClick={() => setEditVersion(true)}>
              V{version?.version}<Rocket />
            </div>)
          : <Select
              defaultValue={version?.id}
              className='w-40'
              loading={isPending}
              options={versions?.map(v => ({ label: `V${v.version}`, value: v.id }))}
              onChange={toggleCurrentVersion}
            />
      }
    </div>
  </>)
}