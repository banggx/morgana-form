import { FormInstance, type Rule } from 'antd/es/form'

export type FormSchemaType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'color' | 'textarea' | 'select' | 'slider' | string;

export type ReactFunctionComponent = (...args: any) => JSX.Element;
export type DepHandler = (opts: { form: FormInstance; key: string; changeValue: (val: any) => void; toggle: (visible: boolean) => void;}, data: Record<string, any>) => void;
export type NamePath = string | number | (string | number)[]
export interface FormSchema {
  type: FormSchemaType;
  title?: string;
  description?: string;
  default?: any;
  required?: boolean;
  options?: {label: string, value: any}[]; // select 选项
  properties?: Record<string, FormSchema>; // 对象扩展选项
  items?: FormSchema | Record<string, FormSchema>;  // 数组扩展选项
  'x-component-props'?: Record<string, any>;
  'x-component'?: React.FunctionComponent | React.Component | ReactFunctionComponent;
  'x-rules'?: Rule[];
  effect?: {
    dep: NamePath;
    handler: DepHandler
  }
}
