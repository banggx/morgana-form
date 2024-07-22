import { Typography } from 'antd'
import { TitleProps } from './interface'

export default function Title(props: TitleProps) {
  return <Typography.Title {...props}>
    {props.text}
  </Typography.Title>
}