import { useContext, useState, useEffect } from 'react'
import { Form } from 'antd'
import { FormSchema, NamePath } from '@/typings/schema'
import { getFormComponent } from '.'
import { formContext } from '..'
import { namePathToString } from '../utils'

export default function SchemaFormItem(props: { name: NamePath, fullName?: NamePath, schema: FormSchema }) {
  const { name, fullName, schema } = props
  const { form, effect } = useContext(formContext) || {}
  const [visible, setVisible] = useState(true)

  const formType = schema.type
  const FormComponent = getFormComponent(formType) || schema['x-component']
  const noShowLabelKey = ['object', 'array']

  useEffect(() => {
    if (effect && schema.effect) {
      const key = namePathToString(fullName || name)
      effect.register({
        key,
        dep: schema.effect.dep,
        handler: schema.effect.handler,
        change: (val) => form?.setFieldValue(fullName || name, val),
        toggle: setVisible
      })
      return () => effect.unregister(schema.effect?.dep || [], key)
    }
  }, [])

  if (!FormComponent) {
    return null;
  }

  return visible ? <Form.Item
    label={noShowLabelKey.includes(formType) ? null : schema.title}
    name={name}
    rules={schema['x-rules']}
    tooltip={schema.description}
  >
    <FormComponent name={name} schema={schema} />
  </Form.Item> : null
}