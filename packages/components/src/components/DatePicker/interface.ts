import { CommonProps } from '../../typings'

export interface DatePickerProps extends CommonProps {
  label: string;
  placeholder: string;
  format: string;
  maxDate: string;
  minDate: string;
  mode: 'time' | 'date' | 'month' | 'year';
}