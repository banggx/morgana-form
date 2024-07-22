'use client'
import { Avatar, Popover } from 'antd'
import { signOut } from 'next-auth/react'

interface UserInfoProps {
  name: string;
  image: string;
}
export default function UserInfo(props: UserInfoProps) {
  const { name, image } = props;

  return (<Popover content={
    <div className='min-w-24'>
      <div
        className='px-2 text-md h-10 leading-10 text-slate-700 font-medium cursor-pointer rounded-md hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-600'
      >{name}</div>
      <div
        className='px-2 text-md h-10 leading-10 text-slate-700 font-medium cursor-pointer rounded-md hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-600'
        onClick={() =>signOut()}
      >退出登陆</div>
    </div>
  }>
    <Avatar size='large' src={image} alt={name} />
  </Popover>)
}