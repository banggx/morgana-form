import { useState } from 'react'
import { Table } from 'antd'
import { trpcClientReact } from '@/utils/apis'
import useGetProject from '@/hooks/useGetProject'
import useGetVersion from '@/hooks/useGetVersion'
import { cn, parseJSONWithCatch } from '@/lib/utils'
import FormItemChart from './FormItemChart'
import { ComponentItem, getComponentInfoByType, isFormComponent } from '@morgana/components'
import type { ComponentInfoType } from '@/typings/model'

export default function FormTable() {
  const { id } = useGetProject()
  const version = useGetVersion()
  const [page, setPage] = useState(1)
  const [activeChartInfo, setActiveChartInfo] = useState<{ name: string, chart: Exclude<ComponentItem['meta']['chart'], undefined>; itemId: string } | null>(null)
  
  const { data, isPending } = trpcClientReact.form.listVersionForms.useQuery({
    page: page,
    id: id,
    versionId: version.id
  }, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const showFormItenChart = (itemId: string, name: string, meta?: ComponentItem['meta']) => {
    if (!meta?.chart) {
      return;
    }
    setActiveChartInfo({
      itemId,
      name,
      chart: meta.chart
    })
  }
  
  const versionFormSchema = parseJSONWithCatch(version.schema)
  const tableFormColumns = (versionFormSchema.components || [])
    .filter((component: ComponentInfoType) => isFormComponent(component.type))
    .map((component: ComponentInfoType) => {
      const componentMeta = getComponentInfoByType(component.type)?.meta;
      return {
        title: <div 
          className={cn('text-sm font-medium text-gray-800 cursor-pointer dark:text-slate-300', {
            'text-blue-500': component.id === activeChartInfo?.itemId
          })}
          onClick={() => showFormItenChart(component.id, component.name, componentMeta)}
        >
          { component.name }
        </div>,
        dataIndex: component.id,
        key: component.id,
        width: 200,
        render: componentMeta?.tableRender,
      }
    })
  const tableDataSource = (data?.items || []).map(item => ({
    ...parseJSONWithCatch(item.data),
    id: item.id
  }))

  return <>
    <Table
      columns={tableFormColumns}
      loading={isPending}
      dataSource={tableDataSource}
      rowKey={'id'}
      scroll={{ x: 'max-content' }}
      pagination={{
        pageSize: 10,
        current: page,
        total: data?.total || 0,
        onChange(page: number) {
          setPage(page)
        }
      }}
    />
    {
      activeChartInfo && <FormItemChart visible={!!activeChartInfo} {...activeChartInfo} onClose={() => setActiveChartInfo(null)} />
    }
  </>
}