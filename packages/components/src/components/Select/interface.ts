import { CommonProps } from '../../typings'

export interface SelectProps extends CommonProps {
  label: string;
  mode: 'tags' | 'multiple';
  options: Array<string>;
}