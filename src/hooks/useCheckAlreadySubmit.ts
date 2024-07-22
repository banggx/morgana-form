import { useCallback, useEffect, useState } from "react"
import { trpcClient } from "@/utils/apis"
import { getFingerPrintID } from "@/utils/tools"

export function useCheckAlreadySubmit(id: string, versionId?: string | null) {
  const [loading, setLoading] = useState(true)
  const [hasSubmit, setHasSubmit] = useState(false)

  const getProjectVersion = useCallback(async () => {
    if (!versionId) return;
    const finger = await getFingerPrintID()
    const res = await trpcClient.query('form.checkAlreadySubmit', {
      finger,
      formId: id,
      versionId: versionId,
    }) as boolean
    setHasSubmit(res)
    setLoading(false)
  }, [id, versionId])

  useEffect(() => {
    getProjectVersion()
  }, [id, versionId])

  return { loading, hasSubmit, setHasSubmit }
}