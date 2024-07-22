import { Radio as AntRadio } from 'antd'
import { CommonFormProps } from './types'

export default function Select(props: CommonFormProps<any>) {
  const { value, onChange, schema } = props

  return <AntRadio.Group value={value} onChange={onChange} options={schema.options} {...schema['x-component-props']} />
}