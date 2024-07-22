import type { ComponentItem } from './typings'
import { componentsGroupBy } from './utils'
import { ComponentGroup } from './constants'
export * from './typings'
export * from './constants'

// @ts-ignore
const components = require.context('./components', true, /index\.ts$/)
export const componentsMap = components.keys().reduce<Record<string, ComponentItem>>((acc: Record<string, ComponentItem>, fileName: string) => {
  let component = components(fileName)
  const componentInfo = component.default
  const componentType = componentInfo.meta.type
  acc[componentType] = componentInfo
  return acc
}, {})

export const componentGroups = componentsGroupBy(componentsMap)

export const getComponentByType = (type: string) => {
  const componentInfo = componentsMap[type]
  if (!componentInfo) {
    return null
  }
  return componentInfo.component
}

export const getComponentInfoByType = (type: string): ComponentItem | null => {
  return componentsMap[type]
}

export const isFormComponent = (type: string) => {
  const componentInfo = componentsMap[type]
  if (!componentInfo) {
    return false
  }
  return componentInfo.meta.group === ComponentGroup.form
}