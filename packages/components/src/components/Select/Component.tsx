import { Select as AntSelect } from 'antd'
import { SelectProps } from './interface'

export default function Select(props: SelectProps) {
  const { options, ...rest } = props
  const radioOptions = options?.map((option) => ({ label: option, value: option }))
  return <AntSelect options={radioOptions} {...rest} />
}