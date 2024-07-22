import { CommonProps } from '../../typings'

export interface SliderProps extends CommonProps {
  label: string;
  placeholder: string;
  max: number;
  min: number;
  step: number;
  range: boolean;
}