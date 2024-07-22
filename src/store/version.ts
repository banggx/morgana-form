import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Version } from '@/typings/version'

const INIT_STATE: Version = {
  id: '',
  version: 0,
  isOnline: false,
  projectId: '',
  schema: '',
  config: '',
  createdAt: '',
  updatedAt: ''
}

export const versionSlice = createSlice({
  name: 'version',
  initialState: INIT_STATE,
  reducers: {
    resetVersion: (_: Version, action: PayloadAction<Version>) => {
      return action.payload
    },
  }
})

export const {
  resetVersion
} = versionSlice.actions
export default versionSlice.reducer