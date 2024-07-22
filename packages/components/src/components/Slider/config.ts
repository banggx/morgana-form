import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '滑动条',
  type: 'slider',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '滑动条'
    },
    placeholder: {
      type: 'string',
      title: '占位符',
      default: '请输入内容'
    },
    min: {
      type: 'number',
      title: '最小值',
      default: null
    },
    max: {
      type: 'number',
      title: '最大值',
      default: null
    },
    step: {
      type: 'number',
      title: '步长',
      default: 1
    },
    range: {
      type: 'boolean',
      title: '范围选择',
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