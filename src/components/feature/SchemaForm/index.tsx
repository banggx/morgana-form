import { useEffect, createContext, useRef } from 'react'
import { Form, type FormInstance } from 'antd'
import SchemaFormItem from './forms/FormItem'
import { FormDepEffect } from './formDepEffect'
import { FormSchema, NamePath } from '@/typings/schema'
import { iterateObject } from './utils'

interface SchemaFormProps {
  value: Record<string, any>;
  schema: Record<string, FormSchema>;
  disabled?: boolean;
  onChange?: (values: Record<string, any>) => void;
}
export const formContext = createContext<{ form: FormInstance, effect: FormDepEffect } | null>(null)
export default function SchemaForm(props: SchemaFormProps) {
  const { value, schema, disabled, onChange } = props
  const [form] = Form.useForm()
  const depEffect = useRef(new FormDepEffect(form))

  useEffect(() => {
    form.setFieldsValue(value)
  }, [value])

  const formChange = (changeValue: Record<string, any>, values: Record<string, any>) => {
    onChange && onChange(values)
    iterateObject(changeValue, (namePath: NamePath) => {
      depEffect.current.trigger(namePath, values)
    })
  }

  return (<Form
      initialValues={value}
      variant="filled"
      form={form}
      labelAlign='left'
      labelCol={{span: 8}}
      size="small"
      disabled={disabled}
      onValuesChange={formChange}
    >
    <formContext.Provider value={{ form, effect: depEffect.current }}>
      {
        Object.entries(schema).map(([key, value]) => <SchemaFormItem key={key} name={key} schema={value} />)
      }
    </formContext.Provider>
  </Form>)
}