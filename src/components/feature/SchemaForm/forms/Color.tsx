import { ColorPicker } from 'antd'
import { CommonFormProps } from './types'
import type { Color } from 'antd/es/color-picker'

export default function Color(props: CommonFormProps<string>) {
  const { value, onChange, schema } = props

  const handleColorChange = (color: Color) => {
    onChange?.(color.toRgbString())
  }

  return <ColorPicker value={value} onChange={handleColorChange} showText={true} {...schema['x-component-props']} />
}