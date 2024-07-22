import { Empty } from 'antd'
import useGetComponents from '@/hooks/useGetComponents'
import { getComponentInfoByType } from '@morgana/components'
import SchemaForm from '@/components/feature/SchemaForm'
import { useDispatch } from 'react-redux'
import { changeProps, changeForm } from '@/store/componentReducer'
import { FormSchema } from '@/constants/formSchema'

export default function PropsSetter() {
  const dispatch = useDispatch()
  const { selectedComponent, form } = useGetComponents()

  const formPropsChange = (values: Record<string, any>) => {
    dispatch(changeForm({
      props: values as any
    }))
  }

  if (!selectedComponent) {
    return <SchemaForm value={form.props || {}} schema={FormSchema.dataForm} onChange={formPropsChange} />
  }

  const componentInfo = getComponentInfoByType(selectedComponent.type)
  const formSchema = componentInfo?.meta.dataForm;
  
  if (!formSchema) {
    return <Empty description="No form schema found for this component" />
  }

  const propsValueChange = (values: Record<string, any>) => {
    dispatch(changeProps({
      id: selectedComponent.id,
      props: values
    }))
  }

  return <SchemaForm value={selectedComponent.props} schema={formSchema} disabled={selectedComponent.isLocked} onChange={propsValueChange} />
}