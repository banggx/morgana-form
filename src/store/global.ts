import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'

export interface GlobalStateType {
  theme: 'light' | 'dark'
}

const INIT_STATE: GlobalStateType = {
  theme: 'light'
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: INIT_STATE,
  reducers: {
    setTheme: produce((draft: GlobalStateType, action: PayloadAction<'light' | 'dark'>) => {
      draft.theme = action.payload
    }),
  }
})

export const {
  setTheme
} = globalSlice.actions
export default globalSlice.reducer