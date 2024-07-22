import Uppy from "@uppy/core";
import React, { useCallback, useState, useRef, DragEvent, HTMLAttributes } from "react";

type DropzoneFuncChildren = (dragging: boolean) => React.ReactNode
interface DropzoneProps {
  uppy: Uppy;
  children?: React.ReactNode;
  render?: DropzoneFuncChildren;
}
export default function Dropzone({ uppy, render, children, ...divProps }: DropzoneProps & Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  
  const [dragging, setDragging] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const draggingEnterHandler = useCallback((ev: DragEvent) => {
    ev.preventDefault();
    setDragging(true);
  }, [])

  const draggingEndHandler = useCallback((ev: DragEvent) => {
    ev.preventDefault();
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
    timeRef.current = setTimeout(() => {
      setDragging(false);
    }, 50);
  }, [timeRef])

  const dropHandler = useCallback((ev: DragEvent) => {
    ev.preventDefault();
    const files = ev.dataTransfer.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        uppy.addFile({
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
    }
    setDragging(false);
  }, [uppy])

  const dragOverHandler = useCallback((ev: DragEvent) => {
    ev.preventDefault();
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
  }, [timeRef])

  return (<div
    {...divProps}
    onDragEnter={draggingEnterHandler}
    onDragLeave={draggingEndHandler}
    onDrop={dropHandler}
    onDragOver={dragOverHandler}
  >
    { render ? render(dragging) : children }
  </div>)
}