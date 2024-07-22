import { Input } from 'antd'
import { CommonFormProps } from '../../SchemaForm/forms/types'
import type { CircleStyle } from '@/typings/styles';

export default function MarginSetter(props: CommonFormProps<{ padding: CircleStyle; margin: Partial<Record<keyof CircleStyle, number | 'auto'>>; }>) {
  const { value, onChange } = props
  
  const changePadding = (e: React.ChangeEvent<HTMLInputElement>, key: keyof CircleStyle) => {
    const val = e.target.value
    onChange?.({
      ...value!,
      padding: {
       ...value?.padding,
       [key]: Number(val) || val
      }
    })
  }

  const changeMargin = (e: React.ChangeEvent<HTMLInputElement>, key: keyof CircleStyle) => {
    const val = e.target.value
    onChange?.({
      ...value!,
      margin: {
       ...value?.margin,
       [key]: Number(val) || val
      }
    })
  }

  return (<div className='relative w-full h-52'>
    <div className='margin-top-setter absolute top-0 left-0 w-full z-10 h-10 border-l-[40px] border-solid border-l-transparent border-r-[40px] border-r-transparent border-t-[40px] border-t-blue-100/[0.6]'>
      <span className='inline-block w-full absolute -top-10 h-10 bg-transparent'>
        <Input
          value={value?.margin?.top}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changeMargin(ev, 'top')}
        ></Input>
      </span>
    </div>
    <div className='margin-right-setter absolute top-1.5 bottom-1.5 right-0 w-10 z-10 border-t-[40px] border-solid border-t-transparent border-b-[40px] border-b-transparent border-r-[40px] border-r-blue-100/[0.6]'>
      <span className='inline-block h-full absolute top-0 b-0 w-10 bg-transparent'>
        <Input
          value={value?.margin?.right}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changeMargin(ev, 'right')}
        ></Input>
      </span>
    </div>
    <div className='margin-bottom-setter absolute bottom-0 left-0 w-full h-10 z-10 border-l-[40px] border-solid border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-blue-100/[0.6]'>
      <span className='inline-block w-full h-10 absolute top-0 b-0 bg-transparent'>
        <Input
          value={value?.margin?.bottom}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changeMargin(ev, 'bottom')}
        ></Input>
      </span>
    </div>
    <div className='margin-left-setter absolute left-0 top-1.5 bottom-1.5 w-10 z-10 border-t-[40px] border-solid border-t-transparent border-b-[40px] border-b-transparent border-l-[40px] border-l-blue-100/[0.6]'>
      <span className='inline-block w-10 h-full absolute top-0 -left-10 bg-transparent'>
        <Input
          value={value?.margin?.left}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changeMargin(ev, 'left')}
        ></Input>
      </span>
    </div>
    <div className='padding-top-setter absolute top-11 left-11 right-11 z-10 h-10 border-l-[40px] border-solid border-l-transparent border-r-[40px] border-r-transparent border-t-[40px] border-t-blue-100/[0.6]'>
      <span className='inline-block w-full absolute -top-10 h-10 bg-transparent'>
        <Input
          value={value?.padding?.top}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changePadding(ev, 'top')}
        ></Input>
      </span>
    </div>
    <div className='padding-right-setter absolute top-12 bottom-12 right-11 w-10 z-10 border-t-[40px] border-solid border-t-transparent border-b-[40px] border-b-transparent border-r-[40px] border-r-blue-100/[0.6]'>
      <span className='inline-block h-full absolute top-0 b-0 w-10 bg-transparent'>
        <Input
          value={value?.padding?.right}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changePadding(ev, 'right')}
        ></Input>
      </span>
    </div>
    <div className='padding-bottom-setter absolute bottom-11 left-11 right-11 h-10 z-10 border-l-[40px] border-solid border-l-transparent border-r-[40px] border-r-transparent border-b-[40px] border-b-blue-100/[0.6]'>
      <span className='inline-block w-full h-10 absolute top-0 b-0 bg-transparent'>
        <Input
          value={value?.padding?.bottom}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changePadding(ev, 'bottom')}
        ></Input>
      </span>
    </div>
    <div className='padding-left-setter absolute left-11 top-12 bottom-12 w-10 z-10 border-t-[40px] border-solid border-t-transparent border-b-[40px] border-b-transparent border-l-[40px] border-l-blue-100/[0.6]'>
      <span className='inline-block w-10 h-full absolute top-0 -left-10 bg-transparent'>
        <Input
          value={value?.padding?.left}
          className='w-full h-full leading-10 text-center p-0 !bg-transparent !outline-none !border-none'
          placeholder='-'
          onChange={(ev) => changePadding(ev, 'left')}
        ></Input>
      </span>
    </div>
  </div>)
}