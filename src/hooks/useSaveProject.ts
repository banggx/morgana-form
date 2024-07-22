import { useCallback } from "react"
import { trpcClientReact } from "@/utils/apis"
import useGetComponents from "./useGetComponents"
import { message } from "antd"

export default function useSaveProject() {
  const { components, form, flow, id } = useGetComponents()
  const { mutate: changeProject } = trpcClientReact.project.changeProject.useMutation({
    onSuccess: (data) => {
      message.success('项目保存成功.')
    }
  });

  const saveProject = useCallback(async () => {
    changeProject({
      id,
      schema: JSON.stringify({ components, form, flow }),
    })
  }, [id, components, form, flow])

  return saveProject
}