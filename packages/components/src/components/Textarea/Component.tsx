import { Input as AntInput } from 'antd'
import { TextareaProps } from './interface'

export default function Textarea(props: TextareaProps) {
  return <AntInput.TextArea {...props} />
}