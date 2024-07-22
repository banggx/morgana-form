import { useSelector } from 'react-redux'
import type { StateType } from '@/store'
import type { ProjectStateType } from '@/store/project'

export default function useGetProject() {
  const projectState = useSelector<StateType>(state => state.project) as ProjectStateType

  const { id, name, config } = projectState

  return {
    id,
    name,
    config,
  }
}