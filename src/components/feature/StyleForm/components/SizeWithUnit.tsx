import { InputNumber, Select } from 'antd'
import { CommonFormProps } from '@/components/feature/SchemaForm/forms/types'
import { Unit, WithUnitNumber } from '@/typings/styles';
import { InputNumberProps } from 'antd/lib';

const UnitOptions = [
  { label: 'PX', value: Unit.PX },
  { label: '%', value: Unit.PERCENT },
  { label: 'EM', value: Unit.EM },
  { label: 'REM', value: Unit.REM },
  { label: 'VW', value: Unit.VW },
  { label: 'VH', value: Unit.VH },
]
export default function SizeWithUnit(props: CommonFormProps<WithUnitNumber> & Omit<InputNumberProps, 'value' | 'name' | 'onChange'>) {
  const { value, onChange, schema, ...extraProps } = props

  const changeSizeValue = (size: number | null) => {
    onChange?.({ ...value, value: size } as any)
  }

  const changeUnit = (unit: Unit) => {
    onChange?.({ ...value, unit: unit } as any)
  }

  return (<InputNumber
    value={value?.value}
    placeholder='输入尺寸大小'
    addonAfter={<Select value={value?.unit} options={UnitOptions} onChange={changeUnit} />}
    onChange={changeSizeValue}
    {...extraProps as any}
  />)
}