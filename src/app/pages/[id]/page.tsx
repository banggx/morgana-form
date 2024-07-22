'use client'
import { Spin } from 'antd'
import { trpcClientReact } from "@/utils/apis";
import NotFound from './components/NotFound'
import { parseJSONWithCatch } from '@/lib/utils';
import FormRender from './components/FormRender';
import { useSearchParams } from 'next/navigation'

export default function FormPage({ params }: { params: { id: string }}) {
  const search = useSearchParams()
  const { data, isPending } = trpcClientReact.version.getProjectOnlineVersion.useQuery({
    id: params.id,
    isPreview: !!search.get('preview')
  }, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  
  if (isPending) {
    return <div className='w-full h-full flex justify-center items-center bg-slate-100'>
      <Spin size="large" />
    </div>
  }

  if (!data) {
    return <NotFound />
  }
  
  const { schema = '', config = '' } = (data || {}) as { schema: string, config: string }
  const formScheme = parseJSONWithCatch(schema)

  return <FormRender id={params.id} versionId={data.id} schema={formScheme} config={config} />
}