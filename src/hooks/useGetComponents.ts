import { useSelector } from 'react-redux'
import type { StateType } from '@/store'
import type { ComponentsStateType } from '@/store/componentReducer'

export default function useGetComponents() {
  const componentsState = useSelector<StateType>(state => state.components.present) as ComponentsStateType

  const { id, selectedId, components, form, flow } = componentsState
  const selectedComponent = components.find(component => component.id === selectedId)

  return {
    id,
    selectedId,
    components,
    form,
    selectedComponent,
    flow,
  }
}