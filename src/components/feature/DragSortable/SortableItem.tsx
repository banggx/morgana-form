import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { omit } from 'radash'

type SortItemGenerator = (setDraggableNodeRef: (element: HTMLElement | null) => void) => JSX.Element | null | undefined
type PropsType = {
  id: string
  children: JSX.Element | null | undefined | SortItemGenerator
}

export default function SortableItem(props: PropsType) {
  const { id, children } = props
  const { attributes, listeners, setNodeRef, transform, transition, setDraggableNodeRef } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (<div ref={setNodeRef} style={style} {...omit(attributes, ['tabIndex', 'role'])} {...listeners}>
    {
      typeof children === 'function' ? children(setDraggableNodeRef) : children
    }
  </div>)
}