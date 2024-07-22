import { InputNumber, Space } from 'antd'
import { AlignVerticalJustifyStart, AlignHorizontalJustifyEnd, AlignVerticalJustifyEnd, AlignHorizontalJustifyStart, Maximize } from 'lucide-react'
import { CircleStyle } from '@/typings/styles'
import { CommonFormProps } from '@/components/feature/SchemaForm/forms/types'

export default function CircleSizeSetter(props: CommonFormProps<number | CircleStyle | null>) {
  const { value, onChange } = props
  
  const changeSingleValue = (value: number | null) => {
    onChange?.(value)
  }

  const changeCircleValue = (value: number | null, key: keyof CircleStyle) => {
    let oldResult: CircleStyle = value && typeof value !== 'number' ? value : {}
    onChange?.({
      ...oldResult,
      [key]: value,
    })
  }

  const changeValueType = () => {
    if (typeof value === 'number' || value == null) {
      onChange?.({})
    } else {
      onChange?.(null)
    }
  }

  return <div className="flex items-center justify-between">
    {
      typeof value === 'number' || value == null
        ? <InputNumber value={value} placeholder='输入尺寸大小' onChange={changeSingleValue} />
        : <Space direction='vertical'>
          <InputNumber addonBefore={<AlignVerticalJustifyStart size={12} />} value={value?.top} placeholder='输入尺寸大小' onChange={(value) => changeCircleValue(value, 'top')} />
          <InputNumber addonBefore={<AlignHorizontalJustifyEnd size={12} />} value={value?.right} placeholder='输入尺寸大小' onChange={(value) => changeCircleValue(value, 'right')} />
          <InputNumber addonBefore={<AlignVerticalJustifyEnd size={12} />} value={value?.bottom} placeholder='输入尺寸大小' onChange={(value) => changeCircleValue(value, 'bottom')} />
          <InputNumber addonBefore={<AlignHorizontalJustifyStart size={12} />} value={value?.left} placeholder='输入尺寸大小' onChange={(value) => changeCircleValue(value, 'left')} />
        </Space>
    }
    <Maximize size={16} className='cursor-pointer ml-2' onClick={changeValueType} />
  </div>
}