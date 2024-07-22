import { useCallback, useEffect, useState } from "react"
import { trpcClient } from "@/utils/apis"
import { useDispatch } from "react-redux"
import { resetVersion } from "@/store/version"
import { Version } from "@/typings/version"

export default function useLoadVersion(id: string, versionId?: string) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const getProjectVersion = useCallback(async () => {
    setLoading(true)
    const res = await trpcClient.query('version.getProjectVersion', {
      projectId: id,
      versionId: versionId,
    }) as Version

    if (res) {
      dispatch(resetVersion({
        id: res.id,
        version: res.version,
        projectId: res.projectId,
        schema: res.schema,
        config: res.config,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
        isOnline: res.isOnline,
      }))
    }
    setLoading(false)
  }, [id, versionId])

  useEffect(() => {
    getProjectVersion()
  }, [id, versionId])

  return { loading }
}