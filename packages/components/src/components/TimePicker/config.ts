import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '时间选择',
  type: 'time',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '时间选择'
    },
    placeholder: {
      type: 'string',
      title: '占位符文案',
      default: '请选择时间'
    },
    format: {
      type: 'string',
      title: '格式化',
      default: 'HH:mm:ss'
    },
    showNow: {
      type: 'boolean',
      title: '显示当前',
      default: false
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
}