import { useCallback } from "react"
import { trpcClientReact } from "@/utils/apis"
import useGetProject from "./useGetProject"
import useGetComponents from "./useGetComponents"
import { message } from "antd"
import { useRouter } from "next-nprogress-bar"

export default function usePublishProject() {
  const { id, config } = useGetProject()
  const { components, form, flow } = useGetComponents()
  const router = useRouter()
  const { mutateAsync } = trpcClientReact.project.publish.useMutation({
    onSuccess: () => {
      message.success('项目发布成功，2秒后跳转到统计页面')
      setTimeout(() => {
        router.push(`/statistic/${id}`)
      }, 2000)
    }
  });

  const publishProject = () => {
    return mutateAsync({
      id,
      schema: JSON.stringify({ components, form, flow }),
      config: JSON.stringify(config),
    })
  }

  return publishProject
}