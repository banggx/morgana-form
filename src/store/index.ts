import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import componentReducer, { ComponentsStateType } from './componentReducer'
import projectReducer, { ProjectStateType } from './project'
import globalReducer, { GlobalStateType } from './global'
import versionReducer from './version'
import { Version } from '@/typings/version'

export type StateType = {
  components: StateWithHistory<ComponentsStateType>
  project: ProjectStateType,
  version: Version,
  global: GlobalStateType
}

export default configureStore({
  reducer: {
    project: projectReducer,
    version: versionReducer,
    global: globalReducer,
    components: undoable(componentReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponentsState',
        'components/changeTitle',
        'components/selectComponent',
        'components/selectPrev',
        'components/selectNext'
      ])
    })
  }
})