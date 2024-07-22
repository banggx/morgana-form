import { CommonProps } from '../../typings'

export interface TimePickerProps extends CommonProps {
  label: string;
  placeholder: string;
  format: string;
  showNow: boolean;
}