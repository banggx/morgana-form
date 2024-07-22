import { Spin } from 'antd'
import useGetProject from "@/hooks/useGetProject"
import useGetVersion from "@/hooks/useGetVersion"
import PieChart from "@/components/ui/PieChart"
import { trpcClientReact } from "@/utils/apis"

export default function GlobalStatistic() {
  const { id } = useGetProject()
  const version = useGetVersion()

  const { data, isPending } = trpcClientReact.form.statisticForm.useQuery({
    id: id,
    versionId: version.id
  }, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  if (isPending) {
    return <div className='w-full h-full flex justify-center items-center'>
      <Spin size='large' />
    </div>
  }

  return <div className='w-full h-full overflow-auto'>
    <div className='grid grid-cols-2 gap-4 w-full'>
      <div className='w-full h-full shadow-md p-4 border border-solid rounded-md border-slate-100 dark:border-slate-500'>
        <h3 className='text-xl font-bold text-slate-600 leading-snug font-sans dark:text-slate-300'>系统数据</h3>
        <div className='w-full h-[360px]'>
          <PieChart className='h-full' dataSource={data?.basic.map(item => ({ type: item.os, value: item.osCount })) || []} title='OS' />
        </div>
      </div>
      <div className='w-full h-full shadow-md p-4 border border-solid rounded-md border-slate-100 dark:border-slate-500'>
        <h3 className='text-xl font-bold text-slate-600 leading-snug font-sans dark:text-slate-300'>浏览器数据</h3>
        <div className='w-full h-[360px]'>
          <PieChart dataSource={data?.basic.map(item => ({ type: item.browser, value: item.browserCount })) || []} title='Browser' />
        </div>
      </div>
    </div>
  </div>
}