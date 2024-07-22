import { useCallback, useContext, useEffect, useState } from 'react'
import { Form } from 'antd'
import { formRenderContext } from './FormRender'
import styleParser from "@/lib/styleParser"
import { getComponentInfoByType, ComponentGroup } from "@morgana/components"
import { ComponentSourceHandle } from '@/typings/graph'
import type { ComponentInfoType } from "@/typings/model"

export default function RenderItem({ component }: { component: ComponentInfoType }) {
  const { component: Component, meta } = getComponentInfoByType(component.type) || {}
  const [visible, setVisible] = useState(true)
  const { flowAction, form } = useContext(formRenderContext) || {}

  useEffect(() => {
    flowAction?.registerComponent(component.id, {
      setVisible,
      changeValue: meta?.group === ComponentGroup.form 
        ? (value: any) => form?.setFieldValue(component.id, value)
        : undefined
    })
    return () => {
      flowAction?.unregisterComponent(component.id)
    }
  }, [component, flowAction, form, setVisible])

  const clickFlowAction = useCallback((ev: React.MouseEvent<HTMLElement>) => {
    flowAction?.trigger(component.id, ComponentSourceHandle.click, ev)
  }, [flowAction, component])

  if (!Component || !meta || !visible) {
    return null
  }

  const { id, props, style, commonStyle } = component

  const commonStyleValue = styleParser.runner(commonStyle || {})

  if (meta.group === ComponentGroup.form) {
    const { label, rule, ...rest } = props
    return <Form.Item name={id} label={label} rules={rule ? [rule] : undefined} style={{ ...commonStyleValue, ...style }}>
      <Component id={id} {...rest} onClick={clickFlowAction} />
    </Form.Item>
  }

  return <Component id={id} {...props} style={{ ...commonStyleValue, ...style }} onClick={clickFlowAction} />
}