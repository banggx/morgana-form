import { isFunction } from 'radash'
import { BackgroundStyle, BorderStyle, CommonStyleProps, TextStyle, Unit } from '@/typings/styles'

type CommonStylePropsValue = {
  [key in keyof CommonStyleProps]: Exclude<CommonStyleProps[key], boolean>
} & Record<string, any>

export class StyleParser {
  static instance: StyleParser
  
  static getInstance() {
    if (!StyleParser.instance) {
      StyleParser.instance = new StyleParser()
    }
    return StyleParser.instance
  }

  runner(style: CommonStylePropsValue) {
    const chain = {}
    Object.getOwnPropertyNames((this as any).__proto__)
      .filter(property => isFunction((this as any)[property]) && property.startsWith('parse'))
      .reduce((acc, property) => {
        return (this as any)[property].call(this, style, acc)
      }, chain)
    
    return chain;
  }

  parseText(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style?.text) {
      const { size, color, weight, align, style: textStyle, decoration } = style.text as TextStyle
      size && (chain.fontSize = `${size.value}${size.unit || Unit.PX}`)
      color && (chain.color = color)
      weight && (chain.fontWeight = weight)
      align && (chain.textAlign = align)
      decoration && (chain.textDecoration = decoration)
      textStyle && (chain.fontStyle = textStyle)
    }

    return chain
  }

  parseBorder(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style?.border) {
      const { color, width, style: borderStyle, radius } = style.border as BorderStyle
      color && (chain.borderColor = color)
      borderStyle && (chain.borderStyle = borderStyle)
      if (typeof width === 'number') {
        chain.borderWidth = `${width}${Unit.PX}`
      } else if (typeof width === 'object' && width != null) {
        Object.entries(width).forEach(([key, value]) => {
          const borderKey = `border${key.charAt(0).toUpperCase() + key.slice(1)}Width`;
          chain[borderKey] = `${value}${Unit.PX}`
        })
      }

      if (typeof radius === 'number') {
        chain.borderRadius = `${radius}${Unit.PX}`
      } else if (typeof radius === 'object' && radius != null) {
        Object.entries(radius).forEach(([key, value]) => {
          let radiusKey;
          switch (key) {
            case 'top':
              radiusKey = 'borderTopLeftRadius';
              break;
            case 'right':
              radiusKey = 'borderTopRightRadius';
              break;
            case 'bottom':
              radiusKey = 'borderBottomRightRadius';
              break;
            case 'left':
              radiusKey = 'borderBottomLeftRadius';
              break;
          }
          radiusKey && (chain[radiusKey] = `${value}${Unit.PX}`)
        })
      }
    }

    return chain
  }

  parseBackground(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style?.background) {
      const { type } = style.background as BackgroundStyle
      switch (type) {
        case 'color': {
          const { color } = style.background as BackgroundStyle
          color && (chain.backgroundColor = color)
          break
        }
        case 'image': {
          const { image, size, postion, repeat } = style.background as BackgroundStyle
          image && (chain.backgroundImage = `url(${image})`)
          size && (chain.backgroundSize = size)
          postion && (chain.backgroundPosition = postion)
          repeat && (chain.backgroundRepeat = repeat)
          break
        }
        case 'gradient': {
          const { gradientColor, direction, angle, gradientType } = style.background as BackgroundStyle
          const gradientFunc = gradientType === 'radial' ? 'radial-gradient' : 'linear-gradient'
          const gradientColorValue = (gradientColor || []).map(item => {
            if (item.position && item.color) {
              return `${item.color} ${item.position * 100}%`
            }
            return item.color
          }).filter(Boolean).join(', ')
          let gradientValue;
          if (gradientType === 'linear') {
            if (direction) {
              gradientValue = `${direction}, ${gradientColorValue}`
            } else if (angle) {
              gradientValue = `${angle}deg, ${gradientColorValue}`
            } else {
              gradientValue = gradientColorValue
            }
          } else {
            gradientValue = gradientColorValue
          }
          chain.backgroundImage = `${gradientFunc}(${gradientValue})`
          break;
        }
      }
    }
    
    return chain
  }

  parseSize(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style.layout?.size) {
      const { width, height } = style.layout.size
      width && (chain.width = `${width.value}${width.unit || Unit.PX}`);
      height && (chain.height = `${height.value}${height.unit || Unit.PX}`);
    }

    return chain
  }

  parseDisplay(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style.layout?.display) {
      const { display } = style.layout
      display && (chain.display = display)
    }

    return chain
  }

  parseMargin(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style.layout?.margin?.margin) {
      const { top, right, bottom, left } = style.layout.margin.margin
      Object.entries({top, right, bottom, left}).forEach(([key, value]) => {
        if (value != null) {
          const marginKey = `margin${key.charAt(0).toUpperCase() + key.slice(1)}`;
          chain[marginKey] = typeof value === 'string' ? value : `${value}${Unit.PX}`
        }
      })
    }

    return chain
  }

  parsePadding(style: CommonStylePropsValue, chain: Record<string, any>) {
    if (style.layout?.margin?.padding) {
      const { top, right, bottom, left } = style.layout.margin.padding
      Object.entries({top, right, bottom, left}).forEach(([key, value]) => {
        if (value != null) {
          const paddingKey = `padding${key.charAt(0).toUpperCase() + key.slice(1)}`;
          chain[paddingKey] = typeof value === 'string' ? value : `${value}${Unit.PX}`
        }
      })
    }

    return chain
  }
}

export default StyleParser.getInstance()