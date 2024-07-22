import { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { AntdThemeConfig, DarkAntdThemeConfig } from '@/theme/antd'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import useGetGlobal from "@/hooks/useGetGlobal"
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'


export default function AntRegistry({ children }: Readonly<{ children: React.ReactNode; }>) {

  const { theme } = useGetGlobal()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (<AntdRegistry>
    <ConfigProvider theme={theme === 'dark' ? DarkAntdThemeConfig : AntdThemeConfig} locale={zhCN}>
      {children}
    </ConfigProvider>
  </AntdRegistry>)
}