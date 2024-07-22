import { Slider as AntSlider } from 'antd'
import { SliderProps } from './interface'

export default function Input(props: SliderProps) {
  return <AntSlider {...props} />
}