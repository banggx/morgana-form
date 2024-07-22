import { DatePicker as AntDatePicker } from 'antd'
import { DatePickerProps } from './interface'
import dayjs from 'dayjs'

export default function DatePicker(props: DatePickerProps) {
  const { minDate, maxDate, value, onChange, ...rest } = props

  const dateChange = (value: dayjs.Dayjs) => {
    onChange?.(value.format(rest.format || 'YYYY-MM-DD'))
  }

  return <AntDatePicker
    value={value ? dayjs(value) : undefined}
    minDate={minDate ? dayjs(minDate) : undefined}
    maxDate={maxDate ? dayjs(maxDate) : undefined}
    {...rest}
    onChange={dateChange}
  />
}