import z from 'zod'
import { db } from '@/server/db'
import { withLoggerProcedure, router, protectedProcedure } from '../trpc'
import { eq } from 'drizzle-orm'
import { versions } from '../db/model'

export const versionRouter = router({
  getProjectOnlineVersion: withLoggerProcedure
    .input(z.object({
      id: z.string(),
      isPreview: z.boolean().optional()
    }))
    .query(async ({ input }) => {
      const { id, isPreview } = input
      // 检测项目是否被删除
      const project = await db.query.projects.findFirst({
        where: (project, { eq, and, isNull }) => and(eq(project.id, id), isNull(project.deletedAt))
      })

      if (!project) {
        return null
      }

      if (isPreview) {
        return {
          schema: project.schema,
          config: project.config,
          id: null,
          projectId: project.id,
        }
      }

      const result = await db.query.versions.findFirst({
        where: (version, { eq, and }) => and(eq(version.projectId, id), eq(version.isOnline, true))
      })

      return result
    }),

  getProjectVersion: protectedProcedure
    .input(z.object({
      projectId: z.string(),
      versionId: z.string().optional()
    }))
    .query(async ({ input }) => {
      const { projectId, versionId } = input
      
      let versionFilter = versionId ? eq(versions.id, versionId) : eq(versions.isOnline, true)
      const result = await db.query.versions.findFirst({
        where: (version, { eq, and }) => and(eq(version.projectId, projectId), versionFilter)
      })

      return result
    }),
    
  getProjectVersions: protectedProcedure
    .input(z.object({
      projectId: z.string()
    }))
    .query(async ({ input }) => {
      const { projectId } = input
      const result = await db.query.versions.findMany({
        where: (version, { eq }) => eq(version.projectId, projectId)
      })

      return result
    })
})