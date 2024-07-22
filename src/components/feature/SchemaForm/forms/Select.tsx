import { Select as AntSelect } from 'antd'
import { CommonFormProps } from './types'

export default function Select(props: CommonFormProps<any>) {
  const { value, onChange, schema } = props

  return <AntSelect value={value} placeholder={`请选择${schema.title}`} onChange={onChange} options={schema.options} {...schema['x-component-props']} />
}