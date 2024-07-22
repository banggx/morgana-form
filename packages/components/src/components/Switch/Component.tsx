import { Switch as AntSwitch } from 'antd'
import { SwitchProps } from './interface'

export default function Switch(props: SwitchProps) {
  return <AntSwitch {...props} />
}