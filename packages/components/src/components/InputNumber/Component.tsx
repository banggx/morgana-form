import { InputNumber as AntInputNumber } from 'antd'
import { InputNumberProps } from './interface'

export default function Input(props: InputNumberProps) {
  return <AntInputNumber {...props} />
}