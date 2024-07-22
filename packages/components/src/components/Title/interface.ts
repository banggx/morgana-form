import { CommonProps } from '../../typings'

export interface TitleProps extends CommonProps {
  text: string;
  level: 1 | 2 | 3 | 4 | 5;
  mark: boolean;
}