'use client'
import Link from "next/link"
import { Button } from 'antd'
import { Baby, Activity, Codesandbox, WandSparkles } from 'lucide-react'
import HomeIntroduce from "@/components/feature/HomeIntroduce"
import { useScrollEffect } from "@/hooks/useScrollEffect"
import useGetGlobal from "@/hooks/useGetGlobal"
import clsx from 'clsx'

export default function Home() {
  const opacity = useScrollEffect(100)
  const { theme } = useGetGlobal()

  const headerClsx = clsx(`w-full h-[100px] flex items-center sticky top-0 z-50`, {
    'shadow-sm': opacity < 0.2 && opacity > 0.1,
    'shadow-md': opacity > 0.2 && opacity < 0.5,
    'shadow-lg': opacity > 0.5 && opacity < 0.75,
    'shadow-xl': opacity > 0.75,
    'shadow-none': opacity < 0.1,
    'backdrop-blur-md': opacity > 0.2
  })

  return (
    <main className="flex w-full min-w-[1200px] min-h-screen flex-col items-center justify-between relative">
      <header className={headerClsx} style={{ background: theme === 'light' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})` }}>
        <nav className="container flex items-center gap-12 px-12">
          <Button type='text'>
            <Link href='/dashboard/list'>Dashboard</Link>
          </Button>
          <Button type='text'>
            <Link href='/concat'>Concat</Link>
          </Button>
          <Button type='text'>
            <Link href='/document'>Document</Link>
          </Button>
          <Button type='text'>
            <a href="https://github.com/banggx/morgana-form" target="_blank">Github</a>
          </Button>
        </nav>
      </header>
      <section className="container w-full h-[calc(100vh-100px)] flex relative">
        <div className="w-full h-full py-24 px-12 z-10">
          <div className="flex items-center logo-name text-lg text-current font-medium">
            <img className="w-6 h-6 mr-2" src='https://media.mxchensir.com/morgana-form/logo.svg' alt='' />
            MORGana 问卷星
          </div>
          <div className="mt-12 text-8xl font-bold leading-snug">Quickly Build Questionnaire Form</div>
          <div className="mt-16 text-lg text-gray-600">作者微信(wechat) banggx</div>
        </div>
        <img className="absolute block right-0 bottom-0 h-[80vh]" src="https://media.mxchensir.com/morgana-form/home-decorator.png" alt='' />
      </section>
      <section className="w-full h-screen bg-slate-700">
        <div className="container h-full flex flex-col items-center justify-center py-[100px]">
          <h2 className="text-6xl text-slate-200 font-bold font-sans">产品优势</h2>
          <ul className="grid grid-cols-4 mt-40 gap-12">
            <li className="flex flex-col items-center">
              <Baby color="white" className="w-12 h-12" />
              <p className="mt-6 text-xl text-slate-200 font-medium text-center">简单易用</p>
              <span className="mt-2 text-lg text-slate-400 leading-snug text-center">你可以通过拖拽的方式快速搭建问卷表单，并可视化展示问卷结果.</span>
            </li>
            <li className="flex flex-col items-center">
              <Activity color="white" className="w-12 h-12" />
              <p className="mt-6 text-xl text-slate-200 font-medium text-center">数据搜集统计</p>
              <span className="mt-2 text-lg text-slate-400 leading-snug text-center">表单发布后可以直接搜集用户填写的数据，并可视化展示统计数据.</span>
            </li>
            <li className="flex flex-col items-center">
              <WandSparkles color="white" className="w-12 h-12" />
              <p className="mt-6 text-xl text-slate-200 font-medium text-center">智能AI</p>
              <span className="mt-2 text-lg text-slate-400 leading-snug text-center">接入AI大模型能力，帮助快速创建符合你需求的表单问卷.</span>
            </li>
            <li className="flex flex-col items-center">
              <Codesandbox color="white" className="w-12 h-12" />
              <p className="mt-6 text-xl text-slate-200 font-medium text-center">私有化独立部署</p>
              <span className="mt-2 text-lg text-slate-400 leading-snug text-center">项目开源，可自由使用，可进行二次开发.</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="w-full h-screen bg-slate-100 dark:bg-gray-950">
        <div className="container h-full flex flex-col items-center justify-center py-[100px]">
        <h2 className="text-6xl text-slate-700 font-bold font-sans dark:text-slate-300">产品介绍</h2>
        <HomeIntroduce />
        </div>
      </section>
      <section className="w-full bg-gray-900 p-12 text-gray-200">
        <div className="container flex justify-center">
          <div className="links pr-8 border-r border-solid border-gray-600">
            <div className="font-medium text-md">快捷入口</div>
            <div className="text-sm leading-snug mb-3 mt-4 text-gray-500 cursor-pointer hover:text-gray-200">Concat</div>
            <div className="text-sm leading-snug mb-3 text-gray-500 cursor-pointer hover:text-gray-200">Document</div>
            <div className="text-sm leading-snug mb-3 cursor-pointer">
            <a className="text-gray-500 hover:text-gray-200" href="https://github.com/banggx/morgana-form" target="_blank">Github</a>
            </div>
          </div>
          <div className="concat-me pl-8">
            <div className="">联系我们</div>
            <div className="mt-2 text-gray-400 text-sm">
              本项目为开源项目，部署内容仅用于参考，数据随时可能丢失。<br />
              如果对项目感兴趣，可扫描下方二维码添加作者微信，备注【morgana-form】。
            </div>
            <img className="mt-2 w-24 h-24" src="https://media.mxchensir.com/morgana-form/wechat-qrcode.png" />
          </div>
        </div>
      </section>
    </main>
  );
}
