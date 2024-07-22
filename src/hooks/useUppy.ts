import { useEffect, useState } from 'react'
import { UploadCallback, UploadSuccessCallback, Uppy } from '@uppy/core'
import AWSS3 from '@uppy/aws-s3'
import { message } from 'antd'
import { trpcClientReact, trpcPureClient } from '@/utils/apis'
import { useUppyState } from './useUppyState'
import { inferRouterOutputs } from '@trpc/server'
import { nanoid } from 'nanoid'
import type { AppRouter } from '@/server/router'

type FileResult = inferRouterOutputs<AppRouter>['file']['infinityQueryFiles']['items'];
export function useUppy() {
  const [uppy] = useState(() => {
    const uppy = new Uppy()
    uppy.use(AWSS3, {
      shouldUseMultipart: false,
      getUploadParameters(file) {
        return trpcPureClient.file.createPresignedUrl.mutate({
          filename: file.data instanceof File ? file.data.name : nanoid(),
          contentType: file.data.type,
          size: file.size,
        })
      }
    })
    return uppy
  })

  const queryKey = {limit: 10};
  const { data: infinityQueryFiles, isPending, fetchNextPage, hasNextPage } = trpcClientReact.file.infinityQueryFiles.useInfiniteQuery(
    queryKey,
    {
      getNextPageParam: (res) => res.nextCursor,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )

  const filesList = infinityQueryFiles
    ? infinityQueryFiles.pages.reduce((result, page) => {
        return [...result,...page.items];
      }, [] as FileResult)
    : []
  
  const utils = trpcClientReact.useUtils()
  const [uploadingFilesIDs, setUploadingFilesIDs] = useState<string[]>([]);
  const uppyFiles = useUppyState(uppy, (s) => s.files);

  useEffect(() => {
    const handler: UploadSuccessCallback<{}> = (file, resp) => {
      if (file) {
        trpcPureClient.file.saveFile.mutate({
          name: file.data instanceof File ? file.data.name : nanoid(),
          path: resp.uploadURL ?? '',
          type: file.data.type,
        }).then((res) => {
          utils.file.infinityQueryFiles.setInfiniteData(
            queryKey,
            (prev) => {
              if (!prev) {
                return prev
              }
              return {
                ...prev,
                pages: prev.pages.map((page, index) => {
                  if (index === 0) {
                    return {
                      ...page,
                      items: [res, ...page.items]
                    }
                  }
                  return page
                })
              }
            }
          )
        })
      }
    }

    const uploadHandler: UploadCallback = (data) => {
      setUploadingFilesIDs((currentFiles) => [...currentFiles, ...data.fileIDs])
    }

    const uploadCompleteHandler = () => {
      setUploadingFilesIDs([])
    }

    uppy.on('upload', uploadHandler)
    uppy.on('upload-success', handler)
    uppy.on('complete', uploadCompleteHandler)

    return () => {
      uppy.off('upload', uploadHandler)
      uppy.off('upload-success', handler)
      uppy.off('complete', uploadCompleteHandler)
    }
  }, [uppy, utils, queryKey])

  const handleFileDelete = (fileId: string) => {
    const loadingHide = message.loading('删除中...')
    trpcPureClient.file.deleteFile.mutate(fileId)
      .then(() => {
        utils.file.infinityQueryFiles.setInfiniteData(
          { ...queryKey },
          (prev) => {
            if (!prev) {
              return prev;
            }
            return {
              ...prev,
              pages: prev.pages.map((page, index) => {
                if (index === 0) {
                  return {
                    ...page,
                    items: page.items.filter((item) => item.id !== fileId)
                  }
                }
                return page;
              })
            }
          }
        )
      }).finally(() => {
        loadingHide()
        message.success('删除成功')
      })
  }
  
  return {
    uppy,
    uppyFiles,
    uploadingFilesIDs,
    filesList,
    isPending,
    fetchNextPage,
    hasNextPage,
    handleFileDelete,
  };
}