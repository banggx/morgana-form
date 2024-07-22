export const FormSchema = {
  dataForm: {
    layout: {
      type: 'radio',
      title: '表单布局',
      default: 'horizontal',
      options: [
        { label: '水平', value: 'horizontal' },
        { label: '垂直', value:'vertical' },
        { label: '内联', value: 'inline' }
      ],
      'x-component-props': {
        optionType: 'button'
      }
    },
    size: {
      type: 'radio',
      title: '表单尺寸',
      default: 'middle',
      options: [
        { label: '小', value: 'small' },
        { label: '中', value:'middle' },
        { label: '大', value: 'large' }
      ],
      'x-component-props': {
        optionType: 'button'
      }
    },
    variant: {
      type: 'radio',
      title: '表单样式',
      default: 'outlined',
      options: [
        { label: '线框', value: 'outlined' },
        { label: '填充', value: 'filled' },
        { label: '无边框', value: 'borderless' }
      ],
      'x-component-props': {
        optionType: 'button'
      }
    },
    colon: {
      type: 'boolean',
      title: '是否显示冒号',
      default: true,
    },
    labelAlign: {
      type: 'radio',
      title: '标签对齐',
      default: 'left',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' }
      ],
      'x-component-props': {
        optionType: 'button'
      }
    },
    labelCol: {
      type: 'object',
      title: '标签布局',
      properties: {
        span: {
          type: 'slider',
          title: '宽度',
          default: 4,
          'x-component-props': {
            min: 0,
            max: 24,
            step: 1,
          }
        },
        offset: {
          type: 'slider',
          title: '偏移',
          default: 0,
          'x-component-props': {
            min: 0,
            max: 24,
            step: 1,
          }
        }
      }
    }
  },
  commonStyle: {
    background: true,
    layout: true,
  }
}