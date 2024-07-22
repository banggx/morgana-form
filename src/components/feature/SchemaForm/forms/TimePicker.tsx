import { TimePicker as AntTimePicker } from 'antd'
import { CommonFormProps } from './types'
import dayjs from 'dayjs'

export default function TimePicker(props: CommonFormProps<string>) {
  const { value, onChange, schema } = props

  const handleTimeChange = (time: dayjs.Dayjs) => {
    onChange?.(time.format('hh:mm:ss'))
  }

  return <AntTimePicker
    value={dayjs(value)}
    onChange={handleTimeChange}
    {...schema['x-component-props']}
  />
}