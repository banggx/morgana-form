import { Space, Input } from 'antd'
import { CommonFormProps } from '@/components/feature/SchemaForm/forms/types'
import { WithUnitNumber } from '@/typings/styles'
import SizeWithUnit from './SizeWithUnit'
import { concatNamePath } from '@/components/feature/SchemaForm/utils'

export default function SizeSetter(props: CommonFormProps<{ width: WithUnitNumber, height: WithUnitNumber }>) {
  const { value, name, onChange, schema } = props

  const changeSizeValue = (key: 'width' | 'height', size: WithUnitNumber) => {
    onChange?.({
      ...value!,
      [key]: size,
    })
  }

  return (<Space>
    <SizeWithUnit
      value={value?.width}
      addonBefore='W'
      onChange={(size: WithUnitNumber) => changeSizeValue('width', size)}
      schema={schema}
      name={concatNamePath(name, 'width')}
    />
    <SizeWithUnit
      value={value?.height}
      addonBefore='H'
      onChange={(size: WithUnitNumber) => changeSizeValue('height', size)}
      schema={schema}
      name={concatNamePath(name, 'height')}
    />
  </Space>)
}