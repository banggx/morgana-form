import { ComponentItem } from "../typings";

export const enum ComponentGroup {
  basic = 'basic',
  form = 'form'
}

export const ComponentGroups: Record<ComponentGroup, {
  name: string;
  key: ComponentGroup;
  children: ComponentItem[];
}> = {
  [ComponentGroup.basic]: {
    name: '基础组件',
    key: ComponentGroup.basic,
    children: []
  },
  [ComponentGroup.form]: {
    name: '表单组件',
    key: ComponentGroup.form,
    children: []
  }
}

export const FormRuleSchema = {
  type: 'object',
  title: '表单规则',
  properties: {
    message: {
      type: 'textarea',
      title: '错误提示',
      description: '当校验失败时，显示的错误提示信息'
    },
    required: {
      type: 'boolean',
      title: '必填项',
      description: '是否为必填项'
    },
    pattern: {
      type: 'string',
      title: '正则表达式',
      description: '校验输入值是否符合正则表达式'
    },
    min: {
      type: 'number',
      title: '最小值',
      description: '字符串为最小长度，数字为最小值，数组为最小个数'
    },
    max: {
      type: 'number',
      title: '最大值',
      description: '字符串为最大长度，数字为最大值，数组为最大个数'
    },
    len: {
      type: 'number',
      title: '长度',
      description: '字符串为固定长度，数字为确定的数值，数组为固定个数'
    },
    type: {
      type: 'select',
      title: '数据类型',
      options: [
        { value: 'string', label: '字符串' },
        { value: 'number', label: '数字' },
        { value: 'boolean', label: '布尔值' },
        { value: 'url', label: '链接' },
        { value: 'email', label: '邮箱' },
        { value: 'date', label: '日期' },
      ]
    }
  }
}