import { useSelector } from 'react-redux'
import type { StateType } from '@/store'
import type { ComponentsStateType } from '@/store/componentReducer'

export default function useGetComponentById(id: string) {
  const componentsState = useSelector<StateType>(state => state.components.present) as ComponentsStateType

  const components = componentsState.components

  return components.find(component => component.id === id)
}