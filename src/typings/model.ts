export interface ComponentInfoType {
  id: string
  type: string
  name: string
  isHidden?: boolean
  isLocked?: boolean
  props: Record<string, any>
  style: Record<string, any>
  commonStyle: Record<string, any>
}

export interface FormPropsType {
  layout: 'horizontal' | 'vertical' | 'inline'
  labelCol: Record<string, any>
  labelAlign: 'left' | 'right'
  size: 'small' | 'middle' | 'large'
  variant: 'outlined' | 'borderless' | 'filled'
  colon: boolean
}
export interface FormInfoType {
  style?: Record<string, any>
  commonStyle?: Record<string, any>
  props?: FormPropsType;
}