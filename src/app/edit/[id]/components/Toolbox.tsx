import { useState } from 'react'
import useGetComponents from '@/hooks/useGetComponents'
import useSaveProject from '@/hooks/useSaveProject'
import { copySelected, moveComponent, pasteComponent, removeSelected, toggleHidden, toggleLocked } from '@/store/componentReducer'
import { Space, Button, Tooltip } from 'antd'
import { Save, Trash2, EyeOff, LockKeyhole, Copy, ClipboardPaste, ArrowUp, ArrowDown, Redo2, Undo2, ScanEye } from 'lucide-react'
import PreviewForm from './PreviewForm'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'

export default function Toolbox() {
  const dispatch = useDispatch()
  const { selectedId, components } = useGetComponents()
  const saveProject = useSaveProject()
  const [visiblePreview, setVisiblePreview] = useState(false)
  const length = components.length
  const selectedIndex = components.findIndex(item => item.id === selectedId)
  const isFirst = selectedIndex === 0
  const isLast = selectedIndex === length - 1

  const handleDelete = () => {
    dispatch(removeSelected())
  }

  const handleHidden = () => {
    dispatch(toggleHidden({ id: selectedId, isHidden: true }))
  }

  const handleLock = () => {
    dispatch(toggleLocked({ id: selectedId }))
  }
  
  const handleCopy = () => {
    dispatch(copySelected())
  }

  const handlePaste = () => {
    dispatch(pasteComponent())
  }

  const moveUp = () => {
    if (isFirst) return
    dispatch(moveComponent({
      oldIndex: selectedIndex,
      newIndex: selectedIndex - 1
    }))
  }

  const moveDown = () => {
    if (isLast) return
    dispatch(moveComponent({
      oldIndex: selectedIndex,
      newIndex: selectedIndex + 1
    }))
  }

  const undo = () => {
    dispatch(ActionCreators.undo())
  }

  const redo = () => {
    dispatch(ActionCreators.redo())
  }

  return (<>
    <Space size='middle'>
      <Tooltip title="撤销">
        <Button type='text' icon={<Undo2 size={17} />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button type='text' icon={<Redo2 size={17} />} onClick={redo}></Button>
      </Tooltip>
      <Tooltip title="删除">
        <Button type='text' icon={<Trash2 size={17} />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button type='text' icon={<EyeOff size={17} />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button type='text' icon={<LockKeyhole size={17} />} onClick={handleLock}></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button type='text' icon={<Copy size={17} />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button type='text' icon={<ClipboardPaste size={17} />} onClick={handlePaste}></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button type='text' disabled={isFirst} icon={<ArrowUp size={17} />} onClick={moveUp}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button type='text' disabled={isLast} icon={<ArrowDown size={17} />} onClick={moveDown}></Button>
      </Tooltip>
      <Tooltip title="预览">
        <Button type='text' icon={<ScanEye size={17} />} onClick={() => setVisiblePreview(true)}></Button>
      </Tooltip>
      <Tooltip title="保存">
        <Button type='text' icon={<Save size={17} />} onClick={saveProject}></Button>
      </Tooltip>
    </Space>
    <PreviewForm visible={visiblePreview} onClose={() => setVisiblePreview(false)} />
  </>)
}