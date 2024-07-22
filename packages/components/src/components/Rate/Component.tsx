import { Rate as AntRate } from 'antd'
import { RateProps } from './interface'

export default function Rate(props: RateProps) {
  return <AntRate {...props} />
}