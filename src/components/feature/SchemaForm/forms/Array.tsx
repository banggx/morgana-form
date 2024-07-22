import { Form, Collapse, Button, Card, Space } from 'antd'
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import SchemaFormItem from './FormItem'
import { isFormSchema, namePathToString, concatNamePath } from '../utils'
import schemaParser from '@/lib/schemaParser'
import SortableContainer from '@/components/feature/DragSortable/SortableContainer'
import SortableItem from '@/components/feature/DragSortable/SortableItem'
import { arrayMove } from '@dnd-kit/sortable'
import type { CommonFormProps } from './types'

export default function ArrayForm(props: CommonFormProps<any[]>) {
  const { value, schema, name, onChange } = props

  const createNewItem = () => {
    return isFormSchema(schema.items) ? schemaParser.parse({ result: schema.items }).result : schemaParser.parse(schema.items!)
  }

  const valueWithId = (value || [])?.map((item, index) => ({...item, id: `${index}` }))

  const sortableArray = (oldIndex: number, newIndex: number) => {
    value && onChange?.(arrayMove(value, oldIndex, newIndex))
  }

  return (<Collapse
    items={[{
      key: namePathToString(name),
      label: schema.title,
      children: <SortableContainer items={valueWithId} onDragEnd={sortableArray}>
        <Form.List name={name}>
          {
            (fields, {remove, move, add}) => (
              <Space direction='vertical' className='w-full'>
                {
                  fields?.map(({ key, name: curName }, index) => {
                    const fullCurName = concatNamePath(name, curName)
                    return <SortableItem key={key} id={`${index}`}>
                        {
                          <Card
                            size="small"
                            title={`数据项 ${index + 1}`}
                            extra={<div className='flex items-center gap-2'>
                              <Button shape='circle' icon={<Trash2 size={12} />} danger size="small" onClick={() => remove(index)}></Button>
                              <Button shape='circle' icon={<ArrowUp size={12} />} size="small" disabled={index === 0} onClick={() => move(index, index - 1)}></Button>
                              <Button shape='circle' icon={<ArrowDown size={12} />} size="small" disabled={index === fields.length - 1} onClick={() => move(index, index + 1)}></Button>
                            </div>}
                            className='mb-4'
                          >
                            {
                              isFormSchema(schema.items)
                              ? <SchemaFormItem key={key} name={curName} fullName={fullCurName} schema={schema.items} />
                                : Object.entries(schema.items || {}).map(([key, subSchema]) => {
                                  const subNamePath = concatNamePath(curName, key)
                                  const subFullName = concatNamePath(fullCurName, key)
                                  return <SchemaFormItem key={namePathToString(subNamePath)} name={subNamePath} fullName={subFullName} schema={subSchema} />
                                })
                            }
                          </Card>
                        }
                      </SortableItem>
                  })
                }
                <Button type="dashed" block onClick={() => add(createNewItem())}>
                  <Plus /> 新增数据
                </Button>
              </Space>
            )
          }
        </Form.List>
      </SortableContainer>
    }]}
  ></Collapse>)
}