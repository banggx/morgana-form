import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  copySelected,
  pasteComponent,
  removeSelected,
  selectNext,
  selectPrev,
} from '@/store/componentReducer'
import { ActionCreators } from 'redux-undo'

/**
 * 判断actionElement是否有效
 */
function isActiveElementValid() {
  const activeEle = document.activeElement

  if (activeEle === document.body) {
    // 光标没有focus到input元素上
    return true
  }

  if (activeEle?.matches('div[role="button"')) {
    return true
  }

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  // 删除
  useKeyPress(['Backspace', 'Delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelected())
  })

  // 复制
  useKeyPress(['ctrl+c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelected())
  })

  // 粘贴
  useKeyPress(['ctrl+v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteComponent())
  })

  // 选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrev())
  })

  // 选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNext())
  })

  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.undo())
    },
    { exactMatch: true }
  )

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(ActionCreators.redo())
  })
}

export default useBindCanvasKeyPress
