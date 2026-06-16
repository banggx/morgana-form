import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db';
import { form } from '@/server/db/schema';
import { eq, and, isNull, not, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const formRouter = router({
  listVersionForms: protectedProcedure
    .input(z.object({
      id: z.string(),
      versionId: z.string(),
      limit: z.number().default(10),
      page: z.number().default(1),
    }))
    .query(async ({ input, ctx }) => {
      const { id, versionId } = input;
      // Exclude deleted forms
      const data = await db
        .select()
        .from(form)
        .where(
          and(
            eq(form.projectId, parseInt(id)),
            eq(form.id, parseInt(versionId)),
            isNull(form.deletedAt)
          )
        )
        .limit(input.limit)
        .offset((input.page - 1) * input.limit);
      return data;
    }),

  archiveForms: protectedProcedure
    .input(z.object({
      formIds: z.array(z.number()),
    }))
    .mutation(async ({ input, ctx }) => {
      const { formIds } = input;
      if (formIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'No forms selected' });
      }

      // Check permission: must be project admin
      const projectId = await db
        .select({ projectId: form.projectId })
        .from(form)
        .where(eq(form.id, formIds[0]))
        .then(res => res[0]?.projectId);
      
      if (!projectId) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Project not found' });
      }
      
      // TODO: Implement project admin check via session.userId & project membership
      // For now assume ctx.session.userId is project admin (to be refined in real impl)
      
      const now = new Date();
      const result = await db
        .update(form)
        .set({
          archivedAt: now,
          status: 'archived',
          updatedAt: now,
        })
        .where(
          and(
            eq(form.id, formIds[0]),
            ...formIds.slice(1).map(id => eq(form.id, id))
          )
        )
        .returning({ id: form.id });
      
      return {
        successCount: result.length,
        failedCount: formIds.length - result.length,
        failedIds: formIds.filter(id => !result.some(r => r.id === id)),
      };
    }),

  restoreForms: protectedProcedure
    .input(z.object({
      formIds: z.array(z.number()),
    }))
    .mutation(async ({ input, ctx }) => {
      const { formIds } = input;
      if (formIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'No forms selected' });
      }

      const now = new Date();
      const result = await db
        .update(form)
        .set({
          restoredAt: now,
          status: 'published',
          updatedAt: now,
        })
        .where(
          and(
            eq(form.id, formIds[0]),
            ...formIds.slice(1).map(id => eq(form.id, id))
          )
        )
        .returning({ id: form.id });
      
      return {
        successCount: result.length,
        failedCount: formIds.length - result.length,
        failedIds: formIds.filter(id => !result.some(r => r.id === id)),
      };
    }),

  deleteFormsPermanently: protectedProcedure
    .input(z.object({
      formIds: z.array(z.number()),
    }))
    .mutation(async ({ input, ctx }) => {
      const { formIds } = input;
      if (formIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'No forms selected' });
      }

      const now = new Date();
      const result = await db
        .update(form)
        .set({
          deletedAt: now,
          status: 'deleted',
          updatedAt: now,
        })
        .where(
          and(
            eq(form.id, formIds[0]),
            ...formIds.slice(1).map(id => eq(form.id, id))
          )
        )
        .returning({ id: form.id });
      
      return {
        successCount: result.length,
        failedCount: formIds.length - result.length,
        failedIds: formIds.filter(id => !result.some(r => r.id === id)),
      };
    }),
});
