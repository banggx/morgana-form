import './index.css'

export default function AILoading({ text }: { text: string }) {
  return (<div className='ai-loader'>
    <div className='loader_overlay'></div>
    <div className='loader_cogs'>
      <div className='loader_cogs__top'>
        <div className='top_part'></div>
        <div className='top_part'></div>
        <div className='top_part'></div>
        <div className='top_hole'></div>
      </div>
      <div className='loader_cogs__left'>
        <div className='left_part'></div>
        <div className='left_part'></div>
        <div className='left_part'></div>
        <div className='left_hole'></div>
      </div>
      <div className='loader_cogs__bottom'>
        <div className='bottom_part'></div>
        <div className='bottom_part'></div>
        <div className='bottom_part'></div>
        <div className='bottom_hole'></div>
      </div>
    </div>
    <p className='absolute z-50 text-sm font-medium text-slate-700 left-1/2 -translate-x-1/2 bottom-8'>{ text }</p>
  </div>)
}