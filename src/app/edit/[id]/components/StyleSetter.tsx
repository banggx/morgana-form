import { Empty } from 'antd'
import useGetComponents from "@/hooks/useGetComponents"
import { useDispatch } from "react-redux"
import SchemaForm from '@/components/feature/SchemaForm'
import StyleForm from '@/components/feature/StyleForm'
import { getComponentInfoByType } from '@morgana/components'
import { changeCommonStyle, changeStyle, changeForm } from '@/store/componentReducer'
import { FormSchema } from '@/constants/formSchema'

export default function StyleSetter() {
  const dispatch = useDispatch()
  const { selectedComponent, form } = useGetComponents()

  const formCommonStyleValueChange = (values: Record<string, any>) => {
    dispatch(changeForm({
      commonStyle: values
    }))
  }
  if (!selectedComponent) {
    return (<>
      <StyleForm value={form.commonStyle || {}} commonStyle={FormSchema.commonStyle} onChange={formCommonStyleValueChange} />
    </>)
  }

  const componentInfo = getComponentInfoByType(selectedComponent.type)
  const formSchema = componentInfo?.meta.styleForm;
  const commonStyle = componentInfo?.meta.commonStyle;
  
  if (!formSchema && !commonStyle) {
    return <Empty description="No form schema found for this component" />
  }

  const styleValueChange = (values: Record<string, any>) => {
    dispatch(changeStyle({
      id: selectedComponent.id,
      style: values
    }))
  }

  const commonStyleValueChange = (values: Record<string, any>) => {
    dispatch(changeCommonStyle({
      id: selectedComponent.id,
      style: values
    }))
  }

  return <>
    {
      formSchema && <SchemaForm value={selectedComponent.style} schema={formSchema} disabled={selectedComponent.isLocked} onChange={styleValueChange} />
    }
    {
      commonStyle && <StyleForm value={selectedComponent.commonStyle} commonStyle={commonStyle} disabled={selectedComponent.isLocked} onChange={commonStyleValueChange} />
    }
  </>
}