import { CommonProps } from '../../typings'

export interface ParagraphProps extends CommonProps {
  text: string;
  copyable: boolean;
  ellipsis: boolean;
}