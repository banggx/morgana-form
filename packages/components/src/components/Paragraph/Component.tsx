import { Typography } from 'antd'
import { ParagraphProps } from './interface'

export default function Title(props: ParagraphProps) {
  return <Typography.Paragraph {...props}>
    {props.text}
  </Typography.Paragraph>
}