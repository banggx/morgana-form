import type { ComponentInfoType } from '@/typings/model'
import type { ComponentsStateType } from ".";

export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { components, selectedId } = draft
  const anchor = components.findIndex(component => component.id === selectedId)

  if (anchor < 0) {
    components.push(newComponent)
  } else {
    components.splice(anchor + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.id
}

export function getNextSelectedId(id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(component => !component.isHidden)
  const index = visibleComponentList.findIndex(component => component.id === id)

  if (index === -1) {
    return ''
  }

  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      newSelectedId = visibleComponentList[index - 1].id
    } else {
      newSelectedId = visibleComponentList[index + 1].id
    }
  }
  return newSelectedId
}