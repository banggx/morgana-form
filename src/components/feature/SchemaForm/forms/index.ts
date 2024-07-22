import type { FormSchemaType } from '@/typings/schema'
import type { CommonFormProps } from './types'
import Input from './Input'
import Number from './Number'
import Slider from './Slider'
import Texearea from './Textarea'
import Select from './Select'
import Switch from './Switch'
import Color from './Color'
import ObjectForm from './Object'
import ArrayForm from './Array'
import Radio from './Radio'
import Uploader from './Uploader'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'

const formsMap: Record<FormSchemaType, (props: CommonFormProps) => JSX.Element> = {
  string: Input,
  number: Number,
  slider: Slider,
  textarea: Texearea,
  select: Select,
  boolean: Switch,
  color: Color,
  object: ObjectForm,
  array: ArrayForm,
  radio: Radio,
  image: Uploader,
  date: DatePicker,
  time: TimePicker,
}

export function getFormComponent(type: FormSchemaType) {
  return formsMap[type]
}