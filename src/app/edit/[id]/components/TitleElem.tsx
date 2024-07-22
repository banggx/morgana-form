import { useState } from 'react'
import useGetProject from '@/hooks/useGetProject'
import { changeTitle } from '@/store/project'
import { Button, Space, Input, message } from 'antd'
import { PencilRuler } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { trpcClientReact } from '@/utils/apis'

export default function TitleElem() {
  const { id, name } = useGetProject()
  const [editState, setEditState] = useState(false)
  const [title, setTitle] = useState(name)
  const dispatch = useDispatch()

  const { mutate: changeProject } = trpcClientReact.project.changeProject.useMutation({
    onSuccess: (data) => {
      dispatch(changeTitle(title))
      setEditState(false)
      message.success('项目名已更新.')
    }
  });

  const handleUpdateTitle = () => {
    if (title.trim() === '') {
      return
    }
    if (title === name) {
      setEditState(false)
      return
    }
    changeProject({
      id,
      name: title
    })
  }

  const handleSetEdit = () => {
    setTitle(name)
    setEditState(true)
  }

  if (editState) {
    return <Input
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      onPressEnter={handleUpdateTitle}
    />
  }

  return <Space>
    <div className="text-xl font-semibold">{name}</div>
    <Button type="text" shape='circle' icon={<PencilRuler size={14} onClick={handleSetEdit} />}></Button>
  </Space>
}