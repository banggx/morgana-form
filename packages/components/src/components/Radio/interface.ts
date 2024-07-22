import { CommonProps } from '../../typings'

export interface RadioProps extends CommonProps {
  label: string;
  optionType: 'default' | 'button';
  options: Array<string>;
}