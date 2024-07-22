/**
 * 根据 FormSchema 定义，生成对应的表单默认值
 */
import { FormSchema } from '@/typings/schema'

class SchemaParser {
  static instance: SchemaParser
  
  static getInstance() {
    if (!SchemaParser.instance) {
      SchemaParser.instance = new SchemaParser()
    }
    return SchemaParser.instance
  }

  parse(schemas: Record<string, FormSchema>) {
    const result: Record<string, any> = {}
    Object.entries(schemas).forEach(([key, schema]) => {
      if (schema.default) {
        result[key] = schema.default
        return
      }
      switch (schema.type) {
        case 'string':
          result[key] = this.parseString(schema)
          break
        case 'number':
          result[key] = this.parseNumber(schema)
          break
        case 'array':
          result[key] = this.parseArray(schema)
          break
        case 'object':
          result[key] = this.parseObject(schema)
          break
        case 'boolean':
          result[key] = this.parseBoolean(schema)
          break
        default:
          result[key] = this.parseAny(schema)
      }
    })

    return result
  }

  parseString(schema: FormSchema) {
    return ''
  }

  parseNumber(schema: FormSchema) {
    return undefined
  }
  
  parseBoolean(schema: FormSchema) {
    return false
  }

  parseArray(schema: FormSchema) {
    return []
  }

  parseObject(schema: FormSchema) {
    if (!schema.properties) {
      return {}
    }
    return this.parse(schema.properties)
  }

  parseAny(schema: FormSchema) {
    return undefined
  }
}

export default SchemaParser.getInstance()