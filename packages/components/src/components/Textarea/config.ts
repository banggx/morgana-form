import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '文本域',
  type: 'textarea',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '文本域'
    },
    placeholder: {
      type: 'string',
      title: '占位符',
      default: '请输入内容'
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