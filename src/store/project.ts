import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'

export interface ProjectConfigType {
  title?: string;
}
export interface ProjectStateType {
  id: string;
  name: string;
  config: ProjectConfigType;
}

const INIT_STATE: ProjectStateType = {
  id: '',
  name: '',
  config: {
    title: ''
  }
}

export const projectSlice = createSlice({
  name: 'project',
  initialState: INIT_STATE,
  reducers: {
    resetProject: (_: ProjectStateType, action: PayloadAction<ProjectStateType>) => {
      return action.payload
    },
    changeTitle: produce((draft: ProjectStateType, action: PayloadAction<string>) => {
      draft.name = action.payload
    }),
    changeConfig: produce((draft: ProjectStateType, action: PayloadAction<Partial<ProjectConfigType>>) => {
      draft.config = Object.assign({}, draft.config, action.payload)
    })
  }
})

export const {
  resetProject,
  changeTitle,
  changeConfig,
} = projectSlice.actions
export default projectSlice.reducer