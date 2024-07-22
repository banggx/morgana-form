import { ComponentGroup } from '../../constants'

export default {
  name: '图片组件',
  type: 'image',
  group: ComponentGroup.basic,
  dataForm: {
    src: {
      type: 'image',
      title: '图片链接',
      default: 'https://dummyimage.com/414x320/000/fff.png'
    },
    alt: {
      type: 'string',
      title: '文本描述',
    },
  },
  styleForm: {
    objectFit: {
      type: 'select',
      title: '图片缩放',
      options: [
        { value: 'contain', label: '包含' },
        { value: 'cover', label: '覆盖' },
        { value: 'none', label: '不缩放' },
        { value: 'fill', label: '填充' },
      ],
    }
  },
  commonStyle: {
    layout: true,
    border: true,
  },
}