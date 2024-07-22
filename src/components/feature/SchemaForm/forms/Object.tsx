import { Collapse } from 'antd'
import SchemaFormItem from './FormItem';
import { namePathToString, concatNamePath } from '../utils'
import type { CommonFormProps } from './types';

export default function ObjectForm(props: CommonFormProps) {
  const { schema, name } = props

  return (<Collapse
    items={[
      {
        key: namePathToString(name),
        label: schema.title,
        children: (<>
          {
            Object.entries(schema.properties || {}).map(([key, child]) => {
              const currentNamePath = concatNamePath(name, key)
              return <SchemaFormItem key={namePathToString(currentNamePath)} name={currentNamePath} schema={child} />
            })
          }
        </>)
      }
    ]}
  ></Collapse>)
}