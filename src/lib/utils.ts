import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseJSONWithCatch(json: string, defaulValue: any = {}) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return defaulValue
  }
}

export function evalWithCatch(code: string, defaulValue?: any) {
  try {
    return eval(code)
  } catch (e) {
    return defaulValue
  }
}

export function getFunctionByCode(code: string) {
  return new Function(`return ${code}`)()
}

export function callFunctionWithCatch(func: Function, ...args: any[]) {
  try {
    return func(...args)
  } catch (e) {
    console.error('自定义逻辑执行错误.', e)
    return undefined
  }
}

export function removeCommentsAndMinify(code: string) {
  // 1. 移除多行注释
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // 2. 移除单行注释
  code = code.replace(/\/\/.*?\n/g, '');
  // 3. 代码压缩 (可选，可以使用第三方库，例如 terser)
  // 这里使用简单的替换来压缩，实际应用中建议使用第三方库
  code = code.replace(/\s+/g, ' ').trim();

  return code;
}
