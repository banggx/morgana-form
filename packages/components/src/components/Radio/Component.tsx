import { Radio as AntRadio } from 'antd'
import { RadioProps } from './interface'

export default function Radio(props: RadioProps) {
  const { options, ...rest } = props
  const radioOptions = options?.map((option) => ({ label: option, value: option }))
  return <AntRadio.Group options={radioOptions} {...rest} />
}