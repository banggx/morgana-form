import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '评分',
  type: 'rate',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '评分'
    },
    count: {
      type: 'number',
      title: '总数',
      default: 5
    },
    disabled: {
      type: 'boolean',
      title: '是否禁用',
      default: false
    },
    rule: FormRuleSchema
  },
  commonStyle: {
    layout: {
      margin: {
        padding: {
          top: 12,
          left: 12,
          right: 12,
        }
      }
    },
    border: true,
    background: true,
  },
}