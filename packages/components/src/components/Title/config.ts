import { ComponentGroup } from '../../constants'

export default {
  name: '标题文本',
  type: 'title',
  group: ComponentGroup.basic,
  dataForm: {
    text: {
      type: 'textarea',
      title: '表单文本',
      default: '表单标题'
    },
    level: {
      type: 'select',
      title: '标题级别',
      options: [
        { label: '一级标题', value: 1 },
        { label: '二级标题', value: 2 },
        { label: '三级标题', value: 3 },
        { label: '四级标题', value: 4 },
        { label: '五级标题', value: 5 },
      ],
      default: 1
    },
    mark: {
      type: 'boolean',
      title: '标题标记',
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