export const DRAG_NODE_KEY = '__drag_node__'
export const HANDLE_DOT_STYLE = {width: '8px', height: '8px', background: 'rgb(148 163 184)' }
export const LOGIC_FUNCTION_DEFAULT_CODE = `/**
 * @param {any} input - 前一个节点的返回数据
 * @param {FormInstance} form - 表单实例
 */
function customLogic(input, form) {
  // 自定义逻辑处理函数，函数返回值将作为节点的输出值
}`
export const LOGIC_MONACO_DTS = `
type StoreValue = any;
type NamePath = string | number | boolean | (string | number | boolean)[];
type InternalNamePath = (string | number)[];
interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  warnings: string[];
  name: InternalNamePath;
  validated: boolean;
}
type FilterFunc = (meta: Meta) => boolean
type GetFieldsValueConfig = {
  strict?: boolean;
  filter?: FilterFunc;
};
interface FieldError {
  name: InternalNamePath;
  errors: string[];
  warnings: string[];
}
interface InternalFieldData extends Meta {
  value: StoreValue;
}
interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
  name: NamePath;
}
type RecursivePartial<T> = NonNullable<T> extends object ? {
  [P in keyof T]?: NonNullable<T[P]> extends (infer U)[] ? RecursivePartial<U>[] : NonNullable<T[P]> extends object ? RecursivePartial<T[P]> : T[P];
} : T;
interface ValidateOptions {
  validateOnly?: boolean;
  recursive?: boolean;
  dirty?: boolean;
}
type ValidateFields<Values = any> = {
  (opt?: ValidateOptions): Promise<Values>;
  (nameList?: NamePath[], opt?: ValidateOptions): Promise<Values>;
};
interface FormInstance<Values = any> {
  scrollToField: (name: NamePath, options?: ScrollOptions) => void;
  getFieldInstance: (name: NamePath) => any;
  getFieldValue: (name: NamePath) => StoreValue;
  getFieldsValue: (() => Values) & ((nameList: NamePath[] | true, filterFunc?: FilterFunc) => any) & ((config: GetFieldsValueConfig) => any);
  getFieldError: (name: NamePath) => string[];
  getFieldsError: (nameList?: NamePath[]) => FieldError[];
  getFieldWarning: (name: NamePath) => string[];
  isFieldsTouched: ((nameList?: NamePath[], allFieldsTouched?: boolean) => boolean) & ((allFieldsTouched?: boolean) => boolean);
  isFieldTouched: (name: NamePath) => boolean;
  isFieldValidating: (name: NamePath) => boolean;
  isFieldsValidating: (nameList?: NamePath[]) => boolean;
  resetFields: (fields?: NamePath[]) => void;
  setFields: (fields: FieldData[]) => void;
  setFieldValue: (name: NamePath, value: any) => void;
  setFieldsValue: (values: RecursivePartial<Values>) => void;
  validateFields: ValidateFields<Values>;
  submit: () => void;
}`