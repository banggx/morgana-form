import { useSelector } from 'react-redux'
import type { StateType } from '@/store'
import type { GlobalStateType } from '@/store/global'

export default function useGetGlobal() {
  const globalState = useSelector<StateType>(state => state.global) as GlobalStateType

  return globalState
}