import { Slider as AntSlider } from 'antd'
import { CommonFormProps } from './types'

export default function Slider(props: CommonFormProps<any>) {
  const { value, onChange, schema } = props

  let isRange: boolean = schema['x-component-props']?.range
  if (isRange == null) {
    isRange = Array.isArray(value) ? true : false
  }

  return <AntSlider value={value} onChange={onChange} range={isRange} {...schema['x-component-props']} />
}