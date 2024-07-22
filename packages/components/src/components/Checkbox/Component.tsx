import { Checkbox as AntCheckbox } from 'antd'
import { CheckboxProps } from './interface'

export default function Checkbox(props: CheckboxProps) {
  const { options, ...rest } = props
  const checkboxOptions = options?.map((option) => ({ label: option, value: option }))
  return <AntCheckbox.Group options={checkboxOptions} {...rest} />
}