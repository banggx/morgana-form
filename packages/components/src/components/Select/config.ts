import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '选择器',
  type: 'select',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '选择器'
    },
    placeholder: {
      type: 'string',
      title: '占位符',
      default: '请选择内容'
    },
    mode: {
      type: 'radio',
      title: '模式',
      'x-component-props': {
        optionType: 'button'
      },
      options: [
        { value: 'tags', label: '标签' },
        { value: 'multiple', label: '多选' }
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
    chart: 'bar'
  }
}