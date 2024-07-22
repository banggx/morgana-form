'use client'
import { Spin } from "antd"
import useLoadProject from "@/hooks/useLoadProject"
import StatisticHeader from './components/StatisticHeader'
import StatisticPanel from './components/StatisticPanel'
import useLoadVersion from "@/hooks/useLoadVersion"

export default function StatisticPage({ params }: { params: { id: string } }) {
  const { loading } = useLoadProject(params.id)
  const { loading: versionLoading } = useLoadVersion(params.id)

  if (loading || versionLoading) {
    return <div className='w-full h-full bg-slate-100 flex justify-center items-center dark:bg-gray-900'>
      <Spin />
    </div>
  }

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-gray-800">
      <div className="flex h-[80px] shadow-md bg-white items-center px-4 border-solid border border-slate-100 dark:bg-gray-950 dark:border-gray-800">
        <StatisticHeader />
      </div>
      <div className="flex w-full h-[calc(100vh-80px)] p-4 overflow-hidden">
        <div className="bg-white w-full h-full rounded-md shadow-md p-4 dark:bg-gray-900">
          <StatisticPanel />
        </div>
      </div>
    </div>
  );
}