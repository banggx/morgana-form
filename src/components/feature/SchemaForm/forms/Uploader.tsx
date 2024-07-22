import { useState, UIEvent } from 'react'
import { Input, Button, Space, Modal, Spin, message } from 'antd'
import { UploadCloud, CopyIcon, Trash2, Check } from 'lucide-react'
import Dropzone from '@/components/feature/Dropzone'
import UploadButton from '@/components/feature/UploadButton'
import { LocalFileItem } from '@/components/feature/FileItem'
import { useUppy } from '@/hooks/useUppy'
import { cn } from '@/lib/utils'
import copy from 'copy-to-clipboard'
import { debounce } from 'radash'
import type { CommonFormProps } from './types'

export default function Uploader(props: CommonFormProps<string | null>) {
  const { value, onChange } = props
  const [visibleUploader, setVisibleUploader] = useState(false)
  const [selected, setSelected] = useState<string>(value || '')
  const [loading, setLoading] = useState<boolean>(false)

  const { uppy, isPending, uploadingFilesIDs, uppyFiles, filesList, hasNextPage, fetchNextPage, handleFileDelete } = useUppy()

  const copyURL = (url: string) => {
    const success = copy(url)
    success && message.success('链接已复制')
  }

  const changeHandler = () => {
    onChange?.(selected)
    setVisibleUploader(false)
  }

  const onScrollHandler = (event: UIEvent<HTMLDivElement>) => {
    const offsetHeight = (event.target as HTMLDivElement).offsetHeight
    const scrollTop = (event.target as HTMLDivElement).scrollTop
    const scrollHeight = (event.target as HTMLDivElement).scrollHeight
    if (scrollTop + offsetHeight >= scrollHeight - 30 && hasNextPage && !loading) {
      setLoading(true)
      fetchNextPage().finally(() => setLoading(false));
    }
  }
  const debouncedScrollHandler = debounce({ delay: 100 }, onScrollHandler)

  return (<>
    <Space.Compact>
      <Input value={selected} placeholder='输入图片链接' />
      <Button type='primary' icon={<UploadCloud size={16} />} onClick={() => setVisibleUploader(true)}></Button>
    </Space.Compact>
    <Modal open={visibleUploader} centered classNames={{ body: 'h-[70vh] flex flex-col' }} title='上传图片'
      onCancel={() => setVisibleUploader(false)}
      onOk={changeHandler}
      okButtonProps={{ disabled: !selected }}
    >
      <UploadButton uppy={uppy}>
        <Dropzone
          uppy={uppy}
          className='mb-4'
          render={(dragging) => (<div className={cn('flex justify-center items-center flex-col w-full h-36 border border-gray-200 rounded-md bg-gray-50  cursor-pointer', { 'bg-red-50': dragging } )}>
            <UploadCloud size={32} color='rgb(156, 163, 175)' />
            <span className='text-xs text-gray-400'>拖拽文件到这里上传</span>
          </div>)}
        ></Dropzone>
      </UploadButton>
      <div className='w-full h-full overflow-auto' onScroll={debouncedScrollHandler}>
        {
          isPending
            ? <div className="text-center text-lg text-gray-500 py-4">Loading...</div>
            : (<div className='grid grid-cols-2 gap-4'>
                {
                  uploadingFilesIDs.length ? uploadingFilesIDs.map((id) => {
                    const file = uppyFiles[id];
                    return (<div key={file.id} className='w-full h-32 flex justify-center items-center border border-gray-200 overflow-hidden rounded-md'>
                        <LocalFileItem file={file.data as File} />
                      </div>)
                  }) : null
                }
                {
                  filesList?.map((file) => {
                    return <div
                      key={file.id}
                      className='relative w-full h-32 flex justify-center items-center border border-gray-200 overflow-hidden rounded-md'
                      onClick={() => setSelected(file.url === selected ? '' : file.url)}
                    >
                      <div className="absolute top-0 right-0 flex items-cente z-10">
                        <Button type='primary' icon={<CopyIcon size={14} />} className='!rounded-r-none' onClick={() => copyURL(file.url)}></Button>
                        <Button type="primary" icon={<Trash2 size={14} />} danger className='!rounded-l-none' onClick={() => handleFileDelete(file.id)}></Button>
                      </div>
                      {
                        selected === file.url
                          ? <div className='absolute inset-0 flex justify-center items-center bg-gray-900/[0.75] z-1'>
                              <Check size={32} color='rgb(16 185 129)' />
                            </div>
                          : null
                      }
                      <img src={file.url} className='w-full h-full object-cover' />
                    </div>;
                  })
                }
              </div>)
        }
        {
          loading &&
            <div className='loading-wrapper flex justify-center mt-6'>
              <Spin />
            </div>
        }
      </div>
    </Modal>
  </>)
}