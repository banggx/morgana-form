import { CommonStyleProps } from '@/typings/styles'
import { CommonStyleMap } from './constants/commonStyleSchema'
import { pick } from 'radash'
import schemaParser from '@/lib/schemaParser'

export function genCommonStyleSchema(common: CommonStyleProps) {
  const commonStyleKeys = Object.keys(common)
  const commonStyleMap = pick(CommonStyleMap, commonStyleKeys)
  return commonStyleMap
}

export function genCommonStyleValue(common: CommonStyleProps) {
  const commonStyleMap = genCommonStyleSchema(common)
  let defaultResult: Record<string, Record<string, any>> = {}
  for (const key in commonStyleMap) {
    if (Object.prototype.hasOwnProperty.call(commonStyleMap, key)) {
      const defaultValue = typeof Reflect.get(common, key) === 'boolean' ? {} : Reflect.get(common, key)
      defaultResult[key] = Object.assign({}, schemaParser.parse({ [key]: commonStyleMap[key] })[key], defaultValue)
    }
  }
  return defaultResult
}