import { MouseEvent } from 'react'
import { Form } from 'antd'
import { clsx } from 'clsx'
import useGetComponents from '@/hooks/useGetComponents'
import SortableContainer from '@/components/feature/DragSortable/SortableContainer'
import SortableItem from '@/components/feature/DragSortable/SortableItem'
import CustomComponent from '@/components/feature/CustomComponent'
import { useDispatch } from 'react-redux'
import { moveComponent, selectComponent } from '@/store/componentReducer'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'
import styleParser from '@/lib/styleParser'

export default function EditCanvas() {
  const { components, form, selectedId } = useGetComponents()
  const dispatch = useDispatch()

  useBindCanvasKeyPress()

  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  const selectComponentHandler = (event: MouseEvent, id: string) => {
    event.stopPropagation()
    dispatch(selectComponent(id))
  }

  const commonStyleValue = styleParser.runner(form.commonStyle || {})

  return (<div className="edit-canvas w-[375px] h-[712px] bg-white overflow-auto dark:bg-gray-900">
    <Form {...form.props} style={commonStyleValue}>
      <SortableContainer items={components} onDragEnd={handleDragEnd}>
        {
          components.filter(component => !component.isHidden).map(component => {
            const wrapperDefaultClassName = 'border border-dashed rounded-sm'
              const selectedClassName = 'border-cyan-600 hover:border-cyan-600'
              const defaultClassName = 'border-white hover:border-slate-100 dark:border-gray-800 dark:hover:border-gray-600'
              const lockedClassName = 'opacity-50 cursor-not-allowed'
              const wrapperClassName = clsx(wrapperDefaultClassName, {
                [selectedClassName]: component.id === selectedId,
                [defaultClassName]: component.id !== selectedId,
                [lockedClassName]: component.isLocked,
              })

            return <SortableItem id={component.id} key={component.id}>
              <div className={wrapperClassName} onClick={(event) => selectComponentHandler(event, component.id)}>
                <div className='select-none pointer-events-none outline-none'>
                  <CustomComponent component={component} />
                </div>
              </div>
            </SortableItem>
          })
        }
      </SortableContainer>
    </Form>
  </div>)
}