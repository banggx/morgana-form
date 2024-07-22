import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '单选框',
  type: 'radio',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '单选框'
    },
    optionType: {
      type: 'radio',
      title: '样式',
      default: 'default',
      'x-component-props': {
        optionType: 'button'
      },
      options: [
        { value: 'default', label: '默认' },
        { value: 'button', label: '按钮' }
      ]
    },
    disabled: {
      type: 'boolean',
      title: '是否禁用',
      default: false
    },
    options: {
      type: 'array',
      title: '选项',
      items: {
        type: 'string',
        title: '选项内容'
      }
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
    chart: 'pie',
  }
}