import { useCallback, useEffect, useState } from "react"
import { trpcClient } from "@/utils/apis"
import { useDispatch } from "react-redux"
import { resetComponentsState } from "@/store/componentReducer"
import { Project } from "@/typings/project"
import { parseJSONWithCatch } from "@/lib/utils"
import { resetProject } from "@/store/project"

export default function useLoadProject(id: string) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const loadProjectInfo = useCallback(async () => {
    setLoading(true)
    const res = await trpcClient.query('project.getProjectById', id) as Project
    let projectComponents = []
    let projectForm = {}
    let flowConfig = null
    if (res.schema) {
      const { components, form, flow } = parseJSONWithCatch(res.schema)
      projectComponents = components
      form && (projectForm = form)
      flow && (flowConfig = flow)
    }
    let config = {}
    if (res.config) {
      config = parseJSONWithCatch(res.config)
    }
    dispatch(resetProject({
      id: res.id,
      name: res.name,
      config,
    }))
    dispatch(resetComponentsState({
      id,
      selectedId: '',
      components: projectComponents,
      form: projectForm,
      flow: flowConfig,
      copiedComponent: null,
    }))
    setLoading(false)
  }, [id])

  useEffect(() => {
    loadProjectInfo()
  }, [id])

  return { loading }
}