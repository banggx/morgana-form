import { FormSchema, NamePath } from '@/typings/schema'

export interface CommonFormProps<T = any> {
  value?: T;
  onChange?: (value: T) => void;
  name: NamePath;
  schema: FormSchema;
}