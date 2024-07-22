import { DatePicker as AntDatePicker } from 'antd'
import { CommonFormProps } from './types'
import dayjs from 'dayjs'

export default function DatePicker(props: CommonFormProps<string>) {
  const { value, onChange, schema } = props

  const handleDateChange = (date: dayjs.Dayjs) => {
    onChange?.(date.format('YYYY-MM-DD hh:mm:ss'))
  }

  return <AntDatePicker
    value={dayjs(value)}
    onChange={handleDateChange}
    {...schema['x-component-props']}
  />
}