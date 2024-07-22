import Uppy from '@uppy/core'
import { Button } from 'antd'
import { ChangeEvent, useCallback, useRef, type ReactNode } from "react"
import { Upload } from 'lucide-react'

export default function UploadButton({ uppy, children }: { uppy: Uppy; children?: ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const uploadClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef])

  const uploadFileChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      Array.from(ev.target.files).forEach(file => {
        uppy.addFile({
          name: file.name,
          data: file,
        })
      });
      uppy.upload().then(res => {
        const { successful, failed } = res
        failed.map(item => {
          uppy.removeFile(item.id)
        })
        successful.map(item => {
          uppy.removeFile(item.id)
        })
      })
      ev.target.value = "";
    }
  }, [uppy])

  return (<>
    {
      children
        ? <div className="upload-container" onClick={uploadClick}>{ children }</div>
        : (<Button onClick={uploadClick}>
            <Upload />
          </Button>)
    }
    <input
      ref={inputRef}
      type="file"
      multiple
      className="fixed left-[-100000px]"
      onChange={uploadFileChange}
    />
  </>)
}