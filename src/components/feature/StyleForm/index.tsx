import { CommonStyleProps } from '@/typings/styles'
import { genCommonStyleSchema } from './utils'
import SchemaForm from '../SchemaForm'

interface StyleSchemaFormProps {
  value: Record<string, any>;
  commonStyle: CommonStyleProps;
  disabled?: boolean;
  onChange?: (value: Record<string, any>) => void;
}

export default function StyleSchemaForm(props: StyleSchemaFormProps) {
  let { commonStyle, value, disabled, onChange } = props
  
  const commonSchema = genCommonStyleSchema(commonStyle)

  return (<SchemaForm schema={commonSchema} value={value} disabled={disabled} onChange={onChange} />)
}