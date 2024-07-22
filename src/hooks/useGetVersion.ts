import { useSelector } from 'react-redux'
import type { StateType } from '@/store'
import { Version } from '@/typings/version'

export default function useGetVersion() {
  const versionState = useSelector<StateType>(state => state.version) as Version

  return versionState
}