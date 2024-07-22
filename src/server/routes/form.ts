import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { db } from '@/server/db'
import { protectedProcedure, router, withLoggerProcedure } from '../trpc'
import { formData } from '../db/model'
import { createFormSchema } from '@/server/schema/form-schema'
import { isNull, eq, and, desc, count, sql } from 'drizzle-orm'
import { parseJSONWithCatch } from '@/lib/utils'

export const formRouter = router({
  submitForm: withLoggerProcedure
    .input(createFormSchema)
    .mutation(async ({ input }) => {
      // 检查是否已经提交过了
      const { finger, formId, versionId } = input
      
      const hasResult = await db.query.formData.findFirst({
        where: (formData, { and, eq }) => and(eq(formData.finger, finger), eq(formData.formId, formId), eq(formData.versionId, versionId))
      })

      if (hasResult) {
        throw new Error('你已经提交过了，请勿重复提交')
      }

      const result = await db.insert(formData).values({
        id: uuid(),
        ...input,
      }).returning();
    
      return result[0];
    }),

  checkAlreadySubmit: withLoggerProcedure
    .input(z.object({
      finger: z.string(),
      formId: z.string(),
      versionId: z.string(),
    }))
    .query(async ({ input }) => {
      const { finger, formId, versionId } = input

      const hasResult = await db.query.formData.findFirst({
        where: (formData, { and, eq }) => and(eq(formData.finger, finger), eq(formData.formId, formId), eq(formData.versionId, versionId))
      })

      return hasResult ? true : false
    }),

  listVersionForms: protectedProcedure
    .input(z.object({
      id: z.string(),
      versionId: z.string(),
      limit: z.number().default(10),
      page: z.number().default(1),
    }))
    .query(async ({ input }) => {
      const { id, versionId, limit, page } = input

      const deletedFilter = isNull(formData.deletedAt)
      const projectFilter = eq(formData.formId, id)
      const versionFilter = eq(formData.versionId, versionId)
      
      const result = await db.select({
        id: formData.id,
        data: formData.data,
        createdAt: formData.createdAt,
      }).from(formData)
        .limit(limit)
        .offset((page - 1) * limit)
        .where(and(deletedFilter, projectFilter, versionFilter))
        .orderBy(desc(formData.createdAt))

      const totalCount = await db.select({ count: count() }).from(formData).where(and(deletedFilter, projectFilter, versionFilter))

      return {
        items: result,
        size: limit,
        page: page,
        total: totalCount[0].count
      }
    }),

  statisticForm: protectedProcedure
    .input(z.object({
      id: z.string(),
      versionId: z.string(),
    }))
    .query(async ({ input }) => {
      const osRes = await db.select({
        os: formData.os,
        browser: formData.browser,
        osCount: sql<number>`count(${formData.os})`.mapWith(Number),
        browserCount: sql<number>`count(${formData.browser})`.mapWith(Number),
      })
      .from(formData)
      .groupBy(sql`${formData.os}`, sql`${formData.browser}`)
      .where(and(eq(formData.formId, input.id), eq(formData.versionId, input.versionId)))

      return {
        basic: osRes
      }
    }),

  statisticFormItem: protectedProcedure
    .input(z.object({
      formId: z.string(),
      versionId: z.string(),
      itemId: z.string(),
    }))
    .query(async ({ input }) => {
      const { formId, versionId, itemId } = input
      const deletedFilter = isNull(formData.deletedAt)
      const projectFilter = eq(formData.formId, formId)
      const versionFilter = eq(formData.versionId, versionId)
      
      const result = await db.select({
        id: formData.id,
        data: formData.data,
      }).from(formData)
        .where(and(deletedFilter, projectFilter, versionFilter))

      const statisticResult: any = {}
      result.map(item => parseJSONWithCatch(item.data, undefined))
        .filter(Boolean)
        .forEach((itemData) => {
          const itemValue = itemData[itemId]
          if (!statisticResult[itemValue]) {
            statisticResult[itemValue] = 1
          } else {
            statisticResult[itemValue]++
          }
        })

      return Object.entries(statisticResult).map(([key, value]) => ({type: key, value}));
    })
})