import { Switch as AntSwicth } from 'antd'
import { CommonFormProps } from './types'

export default function Select(props: CommonFormProps<boolean>) {
  const { value, onChange, schema } = props

  return <AntSwicth value={value} onChange={onChange} {...schema['x-component-props']} />
}