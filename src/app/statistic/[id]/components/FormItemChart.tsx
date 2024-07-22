import { Drawer, Empty } from 'antd'
import PieChart from '@/components/ui/PieChart'
import BarChart from '@/components/ui/BarChart'
import useGetProject from '@/hooks/useGetProject';
import useGetVersion from '@/hooks/useGetVersion';
import { trpcClientReact } from '@/utils/apis';
import { ComponentItem } from '@morgana/components';

const chartMap: Record<string, React.FC<any>> = {
  pie: PieChart,
  bar: BarChart
}

interface FormItemChartProps {
  visible: boolean;
  itemId: string;
  name: string;
  chart: Exclude<ComponentItem['meta']['chart'], undefined>
  onClose: () => void;
}
export default function FormItemChart(props: FormItemChartProps) {
  const { itemId, name, chart, visible, onClose } = props
  const { id: formId } = useGetProject()
  const version = useGetVersion()
  const { isPending, data } = trpcClientReact.form.statisticFormItem.useQuery({
    formId,
    versionId: version.id,
    itemId,
  }, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const Chart = chartMap[chart?.chart]
  
  return (<Drawer
      closable
      title={name}
      placement="right"
      open={visible}
      loading={isPending}
      onClose={onClose}
      destroyOnClose
      width={448}
    >
      {
        Chart
          ? <div className='w-[400px] h-[360px] flex justify-center'>
              <Chart
                dataSource={data}
                title={name}
              />
            </div>
          : <Empty description="No chart available" />
      }
    </Drawer>)
}