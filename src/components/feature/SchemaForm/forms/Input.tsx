import { Input as AntInput } from 'antd'
import { CommonFormProps } from './types'

export default function Input(props: CommonFormProps<string>) {
  const { value, onChange, schema } = props

  const changeHandler = (ev: React.ChangeEvent<HTMLInputElement>) =>{
    onChange?.(ev.target.value)
  }

  return <AntInput value={value} placeholder={`请输入${schema.title}`} onChange={changeHandler} {...schema['x-component-props']} />
}