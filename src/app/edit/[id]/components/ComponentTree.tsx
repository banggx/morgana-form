import { Tabs } from 'antd'
import { useDispatch } from 'react-redux'
import { addComponent } from '@/store/componentReducer'
import { componentGroups, type ComponentItem } from '@morgana/components'
import { nanoid } from 'nanoid'
import schemaParser from '@/lib/schemaParser'
import { genCommonStyleValue } from '@/components/feature/StyleForm/utils'

function ComponentList({ components }: { components: ComponentItem[] }) {
  const dispatch = useDispatch()

  const dispatchAddComponent = (component: ComponentItem) => {
    const { type, name } = component.meta

    dispatch(addComponent({
      id: nanoid(),
      type,
      name,
      props: component.meta.dataForm
        ? schemaParser.parse(component.meta.dataForm)
        : {},
      style: component.meta.styleForm
        ? schemaParser.parse(component.meta.styleForm)
        : {},
      commonStyle: component.meta.commonStyle
        ? genCommonStyleValue(component.meta.commonStyle)
        : {},
    }))
  }
  
  return <div className='grid grid-cols-2 gap-4'>
    {
      components.map(component => {
        return <div
          key={component.meta.type}
          className='w-full leading-10 bg-slate-200 rounded-md text-center text-md text-slate-600 font-medium cursor-pointer select-none font-sans dark:bg-slate-500 dark:text-slate-300'
          onClick={() => dispatchAddComponent(component)}
        >
          {component.meta.name}
        </div>
      })
    }
  </div>
}

export default function ComponentTree() {
  return <div className='py-3'>
    <Tabs
      type='card'
      size='small'
      items={componentGroups.map(group => {
        return {
          key: group.key,
          label: group.name,
          children: <ComponentList components={group.children as ComponentItem[]} />
        }
      })}
    ></Tabs>
  </div>
}