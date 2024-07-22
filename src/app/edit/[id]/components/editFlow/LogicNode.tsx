import { useState, useRef } from 'react'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import { Button, Drawer } from 'antd'
import { HANDLE_DOT_STYLE, LOGIC_FUNCTION_DEFAULT_CODE, LOGIC_MONACO_DTS } from './constants'
import Editor, { Monaco } from '@monaco-editor/react'
import { removeCommentsAndMinify } from '@/lib/utils'
import { LogicTargetHandle, LogicSourceHandle } from '@/typings/graph'
 
export default function LogicNode({ id, data }: { id: string, data: Record<string, any> }) {
  const reactFlow = useReactFlow()
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [sourceCode, setSourceCode] = useState(data.code)
  const monacoRef = useRef<Monaco>()
  
  const updateLogic = () => {
    reactFlow.updateNodeData(id, {
      compileCode: removeCommentsAndMinify(sourceCode),
      code: sourceCode,
    })
    setVisibleEdit(false)
  }

  const handleEditorDidMount = (_: any, monaco: Monaco) => {
    monacoRef.current = monaco
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      allowJs: true
    });
    monaco.languages.typescript.javascriptDefaults.setExtraLibs(
      [{ filePath: 'morgana.d.ts', content: LOGIC_MONACO_DTS }]
    )
  }
  
  return <>
    <div className="border border-solid border-slate-300 rounded-md min-w-28 font-sans bg-slate-100 shadow-md dark:bg-slate-600 dark:border-slate-500">
      <div className="component-title text-sm text-center leading-normal font-medium bg-green-600 px-4 py-1 text-slate-200 rounded-t-md">
        逻辑节点
      </div>
      <Handle
        type="target"
        id={LogicTargetHandle.source}
        position={Position.Left}
        style={HANDLE_DOT_STYLE}
      />
      <div className='p-2'>
        <Button type='primary' block onClick={() => setVisibleEdit(true)}>编辑逻辑</Button>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={LogicSourceHandle.result}
        style={HANDLE_DOT_STYLE}
      />
    </div>
    <Drawer
      open={visibleEdit}
      placement='right'
      title='编写代码逻辑'
      width={'60%'}
      onClose={() => setVisibleEdit(false)}
      extra={<>
        <Button type='primary' disabled={!sourceCode} onClick={updateLogic}>保存</Button>
      </>}
    >
      <Editor
        theme='vs-dark'
        defaultLanguage="javascript"
        defaultValue={data.code || LOGIC_FUNCTION_DEFAULT_CODE}
        onMount={handleEditorDidMount}
        onChange={setSourceCode}
      />
    </Drawer>
  </>
}