import { FloatButton } from 'antd'
import useGetGlobal from '@/hooks/useGetGlobal'
import { MoonStar } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setTheme } from '@/store/global'

export default function ThemeButton() {

  const { theme } = useGetGlobal()
  const dispatch = useDispatch()

  const setGlobalTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }
  return (<FloatButton
    style={{right: '24px'}}
    type={theme === 'dark' ? 'primary' : 'default'}
    icon={<MoonStar />}
    onClick={setGlobalTheme}
  ></FloatButton>)
}