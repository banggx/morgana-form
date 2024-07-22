import { InputNumber } from 'antd'
import { CommonFormProps } from './types'

export default function Number(props: CommonFormProps<number | null>) {
  const { value, onChange, schema } = props

  return <InputNumber value={value} placeholder={`请输入${schema.title}`} onChange={onChange} {...schema['x-component-props']} />
}