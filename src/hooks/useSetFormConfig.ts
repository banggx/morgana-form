import { parseJSONWithCatch } from '@/lib/utils'
import { ProjectConfig } from '@/typings/project'
import { useEffect, useRef } from 'react'

export function useSetFormConfig(config: string) {
  const formConfig = useRef<ProjectConfig>()

  useEffect(() => {
    if (config) {
      formConfig.current = parseJSONWithCatch(config)
      const { title = '' } = formConfig.current || {}
      document.title = title
    }
  }, [config])
}