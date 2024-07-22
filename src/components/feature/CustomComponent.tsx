import { Form } from 'antd'
import styleParser from "@/lib/styleParser"
import { ComponentInfoType } from "@/typings/model"
import { getComponentInfoByType, ComponentGroup } from "@morgana/components"

export default function CustomComponent({ component }: { component: ComponentInfoType }) {
  const { component: Component, meta } = getComponentInfoByType(component.type) || {}
  
  if (!Component || !meta) {
    return null
  }

  const { id, props, style, commonStyle } = component

  const commonStyleValue = styleParser.runner(commonStyle || {})

  if (meta.group === ComponentGroup.form) {
    const { label, ...rest } = props
    return <Form.Item name={id} label={label} style={{ ...commonStyleValue, ...style }}>
      <Component id={id} {...rest} />
    </Form.Item>
  }

  return <Component id={id} {...props} style={{ ...commonStyleValue, ...style }} />
}