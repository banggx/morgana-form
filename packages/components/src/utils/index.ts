import type { ComponentItem } from "../typings";
import { ComponentGroups } from '../constants'

export function componentsGroupBy(components: Record<string, ComponentItem>) {
  for (const component of Object.values(components)) {
    const group = component.meta.group;
    const groupInfo = ComponentGroups[group];
    if (groupInfo) {
      groupInfo.children.push(component);
    }
  }
  return Object.values(ComponentGroups);
}