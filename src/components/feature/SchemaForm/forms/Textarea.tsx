import { Input as AntInput } from 'antd'
import { CommonFormProps } from './types'

export default function Textarea(props: CommonFormProps<string>) {
  const { value, onChange, schema } = props

  const changeHandler = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>{
    onChange?.(ev.target.value)
  }

  return <AntInput.TextArea value={value} placeholder={`请输入${schema.title}`} onChange={changeHandler} {...schema['x-component-props']} />
}