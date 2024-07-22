import { isObject, isArray } from 'radash'
import { FormSchema, NamePath } from '@/typings/schema'

export function isFormSchema(schema: any): schema is FormSchema {
  return isObject(schema) && typeof (schema as any).type === 'string'
}

export function namePathToString(namePath: NamePath) {
  if (Array.isArray(namePath)) {
    return namePath.join('.')
  }
  return namePath.toString()
}

export function concatNamePath(...namePaths: NamePath[]) {
  return Array.from(namePaths).flat(2)
}

export function iterateObject(obj: any, callback: (namePath: (string | number)[]) => any, namePath: (string | number)[] = []) {
  if (isArray(obj)) {
    obj.forEach((item, index) => {
      iterateObject(item, callback, namePath.concat(index))
    })
  }
  if (isObject(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterateObject((obj as any)[key], callback, namePath.concat(key))
      }
    }
  }
  namePath.length && callback(namePath)
}