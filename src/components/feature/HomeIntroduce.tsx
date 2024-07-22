import { cn } from "@/lib/utils"
import { useState } from "react"
import useGetGlobal from "@/hooks/useGetGlobal"
import usePreloadImage from "@/hooks/usePreloadImage"

export default function HomeIntroduce() {
  const { theme} = useGetGlobal()
  const [activeIndex, setActiveIndex] = useState(0) 
  const [swiperIntroduce] = useState([
    {
      img: 'http://sgjihpx4q.hn-bkt.clouddn.com/edit.png',
      darkImg: 'http://sgjihpx4q.hn-bkt.clouddn.com/dark-edit.png',
      text: '简洁的表单编辑器面板，通过拖拽的方式快速搭建问卷表单，并可视化展示问卷结果。'
    },
    {
      img: 'http://sgjihpx4q.hn-bkt.clouddn.com/flow.png',
      darkImg: 'http://sgjihpx4q.hn-bkt.clouddn.com/dark-flow.png',
      text: '流程图设计器，通过拖拽的方式快速设计问卷响应式流程，控制表单动态显示逻辑。'
    },
    {
      img: 'http://sgjihpx4q.hn-bkt.clouddn.com/statistic.png',
      darkImg: 'http://sgjihpx4q.hn-bkt.clouddn.com/dark-statistic.png',
      text: '搜集用户提交表单数据，通过可视化形式展示问卷结果，直观呈现问卷数据。'
    },
    {
      img: 'http://sgjihpx4q.hn-bkt.clouddn.com/ai.png',
      darkImg: 'http://sgjihpx4q.hn-bkt.clouddn.com/ai-dark.png',
      text: '智能AI，帮助你快速生成问卷，提升问卷效率，提升问卷质量。',
    }
  ])
  const [swiperImgs] = useState(Array.prototype.flat.call(swiperIntroduce.map(item => [item.img, item.darkImg]), 2) as string[])
  usePreloadImage(swiperImgs)

  return (<div className="w-full mt-12 flex">
    <div className="w-2/3 h-[55vh] mr-8 overflow-hidden rounded-md shadow-md border broder-solid bg-slate-200 border-slate-200 dark:border-slate-600 dark:bg-slate-600">
      <img
        src={theme === 'dark' ? swiperIntroduce[activeIndex].darkImg : swiperIntroduce[activeIndex].img}
        alt="introduce"
        className="w-full h-full object-contain"
      />
    </div>
    <div className="w-1/3 h-full bg-white rounded-md shadow-md border broder-solid border-slate-200 overflow-hidden dark:bg-gray-950 dark:border-slate-500">
      {
        swiperIntroduce.map((item, index) => (<div
          key={index}
          className={cn(
            'w-full py-6 px-4 cursor-pointer border-solid border-b-[1px] border-s-teal-200 text-md leading-normal text-slate-700 font-sans transition-all hover:shadow-md dark:text-slate-300',
            {
              'bg-slate-100 dark:bg-slate-600': index === activeIndex
            }
          )}
          onClick={() => setActiveIndex(index)}
        >
          {item.text}
        </div>))
      }
    </div>
  </div>)
}