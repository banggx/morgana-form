import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '日期选择',
  type: 'date',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '日期选择'
    },
    placeholder: {
      type: 'string',
      title: '占位符文案',
      default: '请选择日期'
    },
    format: {
      type: 'string',
      title: '格式化',
      default: 'YYYY-MM-DD'
    },
    minDate: {
      type: 'date',
      title: '最小日期',
      default: null
    },
    maxDate: {
      type: 'date',
      title: '最大日期',
      default: null
    },
    mode: {
      type: 'select',
      title: '日期选择模式',
      options: [
        { value: 'date', label: '日期' },
        { value: 'time', label: '时间' },
        { value: 'month', label: '月份' },
        { value: 'year', label: '年份' },
      ]
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