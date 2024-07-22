import { CommonProps } from '../../typings'

export interface InputNumberProps extends CommonProps {
  label: string;
  placeholder: string;
  max: number;
  min: number;
  step: number;
}