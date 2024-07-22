import { ComponentGroup } from '../../constants'

export default {
  name: '段落文本',
  type: 'paragraph',
  group: ComponentGroup.basic,
  dataForm: {
    text: {
      type: 'textarea',
      title: '表单文本',
      default: '表单标题'
    },
    copyable: {
      type: 'boolean',
      title: '可复制',
      default: false
    },
    ellipsis: {
      type: 'boolean',
      title: '省略号',
      default: false
    },
  },
  styleForm: {},
  commonStyle: {
    layout: true,
    text: true,
    border: true,
    background: true,
  },
}