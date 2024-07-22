import { FormInstance } from "antd"
import { DepHandler, NamePath } from '@/typings/schema'

export interface DepEffect {
  key: string;
  dep: NamePath;
  handler: DepHandler;
  change: (val: any) => void;
  toggle: (visible: boolean) => void;
}
interface DepMap {
  [key: string | number]: DepItem;
}
type DepItem = DepMap & { $$deps: {key: string; handler: DepHandler}[]; }

export class FormDepEffect {
  form: FormInstance
  deps: DepMap | null = {}
  constructor(form: FormInstance) {
    this.form = form
  }

  register(effect: DepEffect) {
    const { dep } = effect
    const namePath = Array.isArray(dep) ? dep : [dep]
    let idx = 0
    let currentPath = namePath[idx]
    let currentDeps = this.deps
    while (currentPath) {
      let dep: any = currentDeps![currentPath]
      if (!dep) {
        dep = {
          $$deps: [],
        }
        currentDeps![currentPath] = dep
      }
      idx++
      currentPath = namePath[idx]
      currentDeps = dep
      if (currentPath == null) {
        const effectHandler = effect.handler.bind(this.form, { form: this.form, key: effect.key, changeValue: effect.change, toggle: effect.toggle })
        dep.$$deps.push({
          key: effect.key,
          handler: effectHandler
        })
        effectHandler(this.form.getFieldsValue())
      }
    }
  }
  
  unregister(dep: NamePath, key: string) {
    const namePath = Array.isArray(dep) ? dep : [dep]
    let idx = 0
    let currentPath = namePath[idx]
    let currentDeps: any = this.deps
    while (currentPath) {
      currentDeps = currentDeps[currentPath]
      if (!currentDeps) {
        break
      }
      idx++
      currentPath = namePath[idx]
    }
    if (currentDeps && currentDeps.$$deps) {
      const index = currentDeps.$$deps.findIndex((item: {key: string; handler: DepHandler}) => item.key === key)
      index >= 0 && currentDeps.$$deps.splice(index, 1)
    }
  }

  trigger(dep: NamePath, values: Record<string, any>) {
    const namePath = Array.isArray(dep) ? dep : [dep]
    let idx = 0
    let currentPath = namePath[idx]
    let currentDeps: any = this.deps
    while (currentPath) {
      currentDeps = currentDeps[currentPath]
      if (!currentDeps) {
        break
      }
      idx++
      currentPath = namePath[idx]
    }
    if (currentDeps && currentDeps.$$deps) {
      currentDeps.$$deps.forEach((item: {key: string; handler: (data: Record<string, any>) => void}) => {
        item.handler(values)
      })
    }
  }
}