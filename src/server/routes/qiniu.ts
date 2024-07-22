import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { eq, isNull, sql, and, desc } from 'drizzle-orm'
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { protectedProcedure, router } from '../trpc'
import { db } from '../db'
import { files } from '../db/model'

export const qiniuRouter = router({
  createPresignedUrl: protectedProcedure
    .input(z.object({
      filename: z.string(),
      contentType: z.string(),
      size: z.number(),
    }))
    .mutation(async ({ input }) => {
      const date = new Date()
      const isoString = date.toISOString()
      const dateString = isoString.split('T')[0]
      const accessKey = process.env.QINIU_ACCESS_KEY as string
      const secretKey = process.env.QINIU_SECRET_KEY as string
      const region = process.env.QINIU_REGION as string
      const endpoint = process.env.QINIU_ENDPOINT as string
      const bucket = process.env.QINIU_BUCKET as string
      
      const params: PutObjectCommandInput = {
        Bucket: bucket,
        Key: `${dateString}/${input.filename.replace(/\s+/g, '-')}`,
        ContentType: input.contentType,
        ContentLength: input.size,
      }

      const s3Client = new S3Client({
        endpoint,
        region,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
        }
      })

      const command = new PutObjectCommand(params)
      const url = await getSignedUrl(s3Client, command, {
        expiresIn: 60 // seconds
      })

      return {
        url,
        method: 'PUT' as any,
      }
    }),

  saveFile: protectedProcedure
    .input(z.object({
      name: z.string(),
      path: z.string(),
      type: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const url = new URL(input.path)
      const accessURL = new URL(process.env.QINIU_HOST + url.pathname)
      
      const file = await db.insert(files).values({
        ...input,
        id: uuid(),
        path: url.pathname,
        url: accessURL.toString(),
        userId: session.user.id,
        contentType: input.type,
      }).returning()

      return file[0]
    }),

  infinityQueryFiles: protectedProcedure
    .input(z.object({
      cursor: z.object({
        id: z.string(),
        createdAt: z.string(),
      }).optional(),
      limit: z.number().default(10),
    }))
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input

      const deletedFilter = isNull(files.deletedAt)
      const userFilter = eq(files.userId, ctx.session.user.id)
      
      const statement = db.select()
        .from(files)
        .limit(limit)
        .where(cursor
          ? and(sql`("files"."created_at", "files"."id") < (${new Date(cursor.createdAt).toISOString()}, ${cursor.id})`, deletedFilter, userFilter)
          : and(deletedFilter, userFilter)
        )
      
      statement.orderBy(desc(files.createdAt));

      const result = await statement;

      const lastResult = result?.[result.length - 1];

      return {
        items: result,
        nextCursor: lastResult
          ? {
            createdAt: lastResult.createdAt!,
            id: lastResult.id,
          } : null
      }
    }),

  deleteFile: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db
        .update(files)
        .set({
          deletedAt: new Date()
        })
        .where(eq(files.id, input));
    })
})