import { TimePicker as AntTimePicker } from 'antd'
import { TimePickerProps } from './interface'
import dayjs from 'dayjs'

export default function TimePicker(props: TimePickerProps) {
  const { value, onChange, ...rest } = props

  const dateChange = (value: dayjs.Dayjs) => {
    onChange?.(value.format(rest.format || 'HH:mm:ss'))
  }

  return <AntTimePicker
    value={value ? dayjs(value) : undefined}
    {...rest}
    onChange={dateChange}
  />
}