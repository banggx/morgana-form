import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { insertNewComponent, getNextSelectedId } from './utils'
import { arrayMove } from '@dnd-kit/sortable'
import { clone } from 'radash'
import { nanoid } from 'nanoid'
import type { GraphNode } from '@/typings/graph'
import type { Maybe } from '@/typings/common'
import type { ComponentInfoType, FormInfoType } from '@/typings/model'

export interface ComponentsStateType {
  id: string
  selectedId: string
  components: ComponentInfoType[]
  form: FormInfoType
  flow: Record<string, GraphNode> | null
  copiedComponent: Maybe<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  id: '',
  selectedId: '',
  components: [],
  form: {},
  flow: null,
  copiedComponent: null
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponentsState(_: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload
    },
    resetComponents: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType[]>) => {
      draft.components = action.payload
    }),
    selectComponent: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload
      insertNewComponent(draft, newComponent)
    }),
    changeComponentName: produce((draft: ComponentsStateType, action: PayloadAction<{ id: string, name: string }>) => {
      const { id, name } = action.payload
      const component = draft.components.find(c => c.id === id)
      if (component) {
        component.name = name
      }
    }),
    changeProps: produce((draft: ComponentsStateType, action: PayloadAction<{ id: string, props: Record<string, any>; }>) => {
      const { id, props } = action.payload
      const component = draft.components.find(c => c.id === id)
      if (component) {
        component.props = {
          ...component.props,
          ...props
        }
      }
    }),
    changeStyle: produce((draft: ComponentsStateType, action: PayloadAction<{ id: string, style: Record<string, any>; }>) => {
      const { id, style } = action.payload
      const component = draft.components.find(c => c.id === id)
      if (component) {
        component.style = {
          ...component.style,
          ...style
        }
      }
    }),
    changeForm: produce((draft: ComponentsStateType, action: PayloadAction<Partial<FormInfoType>>) => {
      draft.form = {
        ...draft.form,
        ...action.payload,
      }
    }),
    changeCommonStyle: produce((draft: ComponentsStateType, action: PayloadAction<{ id: string, style: Record<string, any>; }>) => {
      const { id, style } = action.payload
      const component = draft.components.find(c => c.id === id)
      if (component) {
        component.commonStyle = {
          ...component.commonStyle,
          ...style
        }
      }
    }),
    moveComponent: produce((draft: ComponentsStateType, action: PayloadAction<{ oldIndex: number, newIndex: number }>) => {
      const { newIndex, oldIndex } = action.payload
      const { components } = draft
      draft.components = arrayMove(components, oldIndex, newIndex)
    }),
    removeSelected: produce((draft: ComponentsStateType) => {
      const { components, selectedId } = draft
      const index = components.findIndex(comp => comp.id === selectedId)
      if (index >= 0) {
        const newSelected = getNextSelectedId(selectedId, components)
        components.splice(index, 1)
        draft.selectedId = newSelected
      }
    }),
    toggleHidden: produce((draft: ComponentsStateType, action: PayloadAction<{id: string; isHidden: boolean}>) => {
      const { components } = draft
      const { id, isHidden } = action.payload
      const curComp = components.find(comp => comp.id === id)
      if (curComp) {
        let newSelectedId = ''
        if (isHidden) {
          newSelectedId = getNextSelectedId(id, components)
        } else {
          newSelectedId = id
        }
        draft.selectedId = newSelectedId
        curComp.isHidden = isHidden
      }
    }),
    toggleLocked: produce((draft: ComponentsStateType, action: PayloadAction<{ id: string }>) => {
      const { components } = draft
      const { id } = action.payload
      const curComp = components.find(comp => comp.id === id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    }),
    copySelected: produce((draft: ComponentsStateType) => {
      const { components, selectedId } = draft
      const curComp = components.find(comp => comp.id === selectedId)
      if (curComp) {
        draft.copiedComponent = clone(curComp)
      }
    }),
    pasteComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent) {
        copiedComponent.id = nanoid()
        insertNewComponent(draft, copiedComponent)
      }
    }),
    selectPrev: produce((draft: ComponentsStateType) => {
      const { components, selectedId } = draft
      const index = components.findIndex(comp => comp.id === selectedId)
      // 为选中或者选中第一个节点时，不做任何操作
      if (index > 0) {
        draft.selectedId = components[index - 1].id
      }
    }),
    selectNext: produce((draft: ComponentsStateType) => {
      const { components, selectedId } = draft
      const index = components.findIndex(comp => comp.id === selectedId)
      // 为选中或者选中最后一个节点时，不做任何操作
      if (index < components.length - 1) {
        draft.selectedId = components[index + 1].id
      }
    }),
    setFlow: (draft: ComponentsStateType, action: PayloadAction<Record<string, GraphNode>>) => {
      draft.flow = action.payload
    }
  },
})

export const {
  resetComponentsState,
  resetComponents,
  selectComponent,
  addComponent,
  changeComponentName,
  changeProps,
  changeStyle,
  changeCommonStyle,
  changeForm,
  moveComponent,
  removeSelected,
  toggleHidden,
  toggleLocked,
  copySelected,
  pasteComponent,
  selectPrev,
  selectNext,
  setFlow,
} = componentSlice.actions
export default componentSlice.reducer
