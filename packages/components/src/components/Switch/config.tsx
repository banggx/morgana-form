import { Tag } from 'antd'
import { ComponentGroup, FormRuleSchema } from '../../constants'

export default {
  name: '开关',
  type: 'switch',
  group: ComponentGroup.form,
  dataForm: {
    label: {
      type: 'string',
      title: '字段名称',
      default: '开关'
    },
    defaultChecked: {
      type: 'boolean',
      title: '默认选中',
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
  tableRender: (val: boolean) => {
    return val ? <Tag color='green'>Yes</Tag> : <Tag>No</Tag>
  }
}