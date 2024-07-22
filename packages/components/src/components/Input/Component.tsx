import { Input as AntInput } from 'antd'
import { InputProps } from './interface'

export default function Input(props: InputProps) {
  return <AntInput {...props} />
}