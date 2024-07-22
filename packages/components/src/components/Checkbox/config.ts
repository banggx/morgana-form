import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '多选框',
  type: 'checkbox',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '多选框'
    },
    options: {
      type: 'array',
      title: '选项',
      items: {
        type: 'string',
        title: '选项内容'
      }
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
    text: true,
    border: true,
    background: true,
  },
  chart: {
    chart: 'bar'
  }
}