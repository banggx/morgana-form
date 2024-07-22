import { router } from './trpc'
import { projectRouter } from './routes/project'
import { qiniuRouter } from './routes/qiniu'
import { versionRouter } from './routes/version'
import { formRouter } from './routes/form'
import { llmRouter } from './routes/llm'
import dotenv from 'dotenv'

dotenv.config()
export const appRouter = router({
  project: projectRouter,
  file: qiniuRouter,
  version: versionRouter,
  form: formRouter,
  llm: llmRouter
})
export type AppRouter = typeof appRouter