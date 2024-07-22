import { Unit } from '@/typings/styles'
import { FormSchema } from '@/typings/schema'
import { get } from 'radash'
import SizeWithUnit from '../components/SizeWithUnit'
import SizeSetter from '../components/SizeSetter'
import MarginSetter from '../components/MarginSetter'
import CircleSizeSetter from '../components/CircleSizeSetter'

export const textStyleSchema: FormSchema = {
  type: 'object',
  title: '文本样式',
  properties: {
    color: {
      type: 'color',
      title: '字体颜色',
      default: '#000000'
    },
    size: {
      type: 'withUnit',
      title: '字体大小',
      "x-component": SizeWithUnit,
      default: {
        value: 16,
        unit: Unit.PX
      },
    },
    align: {
      type: 'radio',
      title: '对齐方式',
      options: [
        { label: '左对齐', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '右对齐', value: 'right' },
      ],
      default: 'left',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: "solid"
      }
    },
    weight: {
      type: 'select',
      title: '字体粗细',
      default: 'normal',
      options: [
        { label: '正常', value: 'normal' },
        { label: '粗体', value: 'bold' },
        { label: '加粗', value: 'bolder' },
        { label: '细体', value: 'lighter' },
        { label: 'medium', value: 500 },
        { label: 'semibold', value: 600 },
        { label: 'bold', value: 700 },
      ]
    },
    style: {
      type: 'radio',
      title: '字体样式',
      default: 'normal',
      options: [
        { label: '正常', value: 'normal' },
        { label: '斜体', value: 'italic' },
        { label: '倾斜体', value: 'oblique' },
      ],
      'x-component-props': {
        optionType: 'button',
        buttonStyle: "solid"
      }
    },
    decoration: {
      type: 'select',
      title: '文本装饰',
      default: 'none',
      options: [
        { label: '无', value: 'none' },
        { label: '下划线', value: 'underline' },
        { label: '删除线', value: 'line-through' },
        { label: '上划线', value: 'overline' },
      ]
    }
  }
}

export const borderStyleSchema: FormSchema = {
  type: 'object',
  title: '边框样式',
  properties: {
    color: {
      type: 'color',
      title: '边框颜色',
    },
    width: {
      type: 'circle-size-setter',
      title: '边框宽度',
      "x-component": CircleSizeSetter,
    },
    style: {
      type: 'radio',
      title: '边框样式',
      default:'solid',
      options: [
        { label: '实线', value:'solid' },
        { label: '虚线', value: 'dashed' },
        { label: '点线', value: 'dotted' },
        { label: '无', value: 'none' },
      ],
      'x-component-props': {
        optionType: 'button',
        buttonStyle: "solid"
      }
    },
    radius: {
      type: 'circle-size-setter',
      title: '圆角半径',
      "x-component": CircleSizeSetter,
    }
  }
}

export const backgroundStyleSchema: FormSchema = {
  type: 'object',
  title: '背景样式',
  properties: {
    type: {
      type: 'radio',
      title: '背景类型',
      default: 'color',
      options: [
        { label: '颜色', value: 'color' },
        { label: '图片', value: 'image' },
        { label: '渐变', value: 'gradient' },
      ],
      'x-component-props': {
        optionType: 'button',
        buttonStyle: "solid"
      }
    },
    color: {
      type: 'color',
      title: '背景颜色',
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'color')
        } 
      }
    },
    image: {
      type: 'string',
      title: '背景图片',
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'image')
        }
      }
    },
    size: {
      type: 'select',
      title: '背景尺寸',
      default: 'cover',
      options: [
        { label: '自动缩放', value: 'auto' },
        { label: '背景覆盖', value: 'cover' },
        { label: '保持宽高比', value: 'contain' },
      ],
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'image')
        }
      }
    },
    repeat: {
      type: 'select',
      title: '背景重复',
      default: 'no-repeat',
      options: [
        { label: '不重复', value: 'no-repeat' },
        { label: 'X轴重复', value: 'repeat-x' },
        { label: 'Y轴重复', value: 'repeat-y' },
        { label: '平铺', value: 'repeat' },
        { label: '重复不裁剪', value: 'space' },
      ],
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'image')
        }
      }
    },
    position: {
      type: 'select',
      title: '背景位置',
      default: 'center',
      options: [
        { label: '左上角', value: 'top left' },
        { label: '左中角', value: 'center left' },
        { label: '左下角', value: 'bottom left' },
        { label: '右上角', value: 'top right' },
        { label: '右中角', value: 'center right' },
        { label: '右下角', value: 'bottom right' },
        { label: '中心', value: 'center' },
        { label: '左侧', value: 'left' },
        { label: '右侧', value: 'right' },
        { label: '上侧', value: 'top' },
        { label: '下侧', value: 'bottom' },
      ],
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'image')
        }
      }
    },
    gradientType: {
      type: 'radio',
      title: '渐变类型',
      default: 'linear',
      options: [
        { label: '线性渐变', value: 'linear' },
        { label: '放射渐变', value: 'radial' },
      ],
      'x-component-props': {
        optionType: 'button',
        buttonStyle: "solid"
      },
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'gradient')
        }
      }
    },
    direction: {
      type: 'select',
      title: '渐变方向',
      default: 'to bottom',
      options: [
        { label: '从上到下', value: 'to bottom' },
        { label: '从下到上', value: 'to top' },
        { label: '从左到右', value: 'to right' },
        { label: '从右到左', value: 'to left' },
        { label: '从左上到右下', value: 'to bottom right' },
        { label: '从右上到左下', value: 'to bottom left' },
        { label: '从左下到右上', value: 'to top right' },
        { label: '从右下到左上', value: 'to top left' },
      ],
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'gradient')
        }
      }
    },
    angle: {
      type: 'number',
      title: '渐变角度',
      default: 0,
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'gradient')
        }
      }
    },
    gradientColor: {
      type: 'array',
      title: '渐变颜色',
      items: {
        color: {
          type: 'color',
          title: '色值',
        },
        position: {
          type: 'number',
          title: '位置',
          'x-component-props': {
            step: 0.1,
            min: 0,
            max: 1,
          }
        }
      },
      effect: {
        dep: ['background', 'type'],
        handler({ toggle }, values) {
          toggle(get(values, 'background.type') === 'gradient')
        }
      }
    }
  }
}

export const layoutStyleSchema: FormSchema = {
  type: 'object',
  title: '布局样式',
  properties: {
    size: {
      type: 'size-setter',
      "x-component": SizeSetter,
      default: {
        width: {
          value: undefined,
          unit: Unit.PX
        },
        height: {
          value: undefined,
          unit: Unit.PX
        }
      }
    },
    display: {
      type: 'select',
      title: '显示方式',
      default: 'block',
      options: [
        { label: '块级', value: 'block' },
        { label: '行内块', value: 'inline-block' },
        { label: '隐藏', value: 'none' },
      ]
    },
    margin: {
      type: 'margin-setter',
      default: {
        margin: null,
        padding: null,
      },
      "x-component": MarginSetter,
    }
  }
}

export const CommonStyleMap: Record<string, FormSchema> = {
  layout: layoutStyleSchema,
  text: textStyleSchema,
  border: borderStyleSchema,
  background: backgroundStyleSchema
}
