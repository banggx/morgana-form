import z from 'zod'
import { v4 as uuid } from 'uuid'
import { and, asc, desc, eq, isNull, isNotNull, count, inArray } from 'drizzle-orm';
import { db } from '@/server/db'
import { projects, versions } from '@/server/db/model';
import { protectedProcedure, router } from '../trpc'
import { createProjectSchema, projectCanFilterByColumns } from '@/server/schema/project-schema'
import { TRPCError } from '@trpc/server';
import { ProjectStatus } from '@/typings/project';

export const projectRouter = router({
  createProject: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await db.insert(projects).values({
        id: uuid(),
        name: input.name,
        description: input.description,
        userId: ctx.session.user.id,
      }).returning();
    
      return result[0];
    }),
  
  listProjects: protectedProcedure
   .input(z.object({
      limit: z.number().default(20),
      page: z.number().default(1),
      orderBy: z.enum(['asc', 'desc']).default('desc'),
      filter: projectCanFilterByColumns.partial().optional(),
   }))
   .query(async ({ ctx, input }) => {
    const { page, limit, orderBy, filter } = input

    const deletedFilter = isNull(projects.deletedAt)
    const userFilter = eq(projects.userId, ctx.session.user.id)
    let filterStatement;
    if (filter) {
      let filterStatements = []
      for (const key in filter) {
        filterStatements.push(eq((projects as any)[key], (filter as any)[key]))
      }
      filterStatement = and(...filterStatements)
    }

    const statement = db.select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      isStar: projects.isStar,
      isPublish: projects.isPublish,
    }).from(projects)
     .limit(limit)
     .offset((page - 1) * limit)
     .where(and(deletedFilter, userFilter, filterStatement))

    statement.orderBy(orderBy === 'desc' ? desc(projects.createdAt) : asc(projects.createdAt))

    const result = await statement
    
    const projectsCountRes = await db.select({ count: count() }).from(projects).where(and(deletedFilter, userFilter, filterStatement));

    return {
      items: result,
      size: limit,
      page: page,
      total: projectsCountRes[0].count
    }
   }),

  getProjectById: protectedProcedure
   .input(z.string())
   .query(async ({ input }) => {
    const result = await db.query.projects.findFirst({
      where: (project, { eq, isNull, and }) => and(eq(project.id, input), isNull(project.deletedAt))
    })
    return result
  }),

  changeProject: protectedProcedure
   .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      isStar: z.boolean().optional(),
      schema: z.string().optional(),
      config: z.string().optional(),
    }))
   .mutation(async ({ ctx, input }) => {
    const project = await db.query.projects.findFirst({
      where: (project, { eq }) => eq(project.id, input.id)
    });
    
    if (project?.userId !== ctx.session.user.id) {
      return new TRPCError({
        code: 'FORBIDDEN'
      })
    }
    
    const { id, ...rest } = input
    await db.update(projects)
      .set({
        ...rest,
        updatedAt: new Date()
      })
      .where(and(eq(projects.id, id), eq(projects.userId, ctx.session.user.id)))
   }),

   publish: protectedProcedure
    .input(z.object({
      id: z.string(),
      schema: z.string(),
      config: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input
      const project = await db.query.projects.findFirst({
        where: (project, { eq }) => eq(project.id, input.id)
      });

      if (project?.userId !== ctx.session.user.id) {
        return new TRPCError({
          code: 'FORBIDDEN'
        })
      }

      const res = await db.transaction(async (tx) => {
        // 将当前版本设置为下线
        await tx.update(versions)
          .set({
            isOnline: false
          })
          .where(and(eq(versions.projectId, id), eq(versions.isOnline, true)))
        const currentVersion = await tx.insert(versions).values({
          id: uuid(),
          projectId: id,
          schema: input.schema,
          config: input.config,
          isOnline: true,
        }).returning()
        await tx.update(projects)
          .set({
            ...rest,
            isPublish: true,
            status: ProjectStatus.PUBLISHED,
            updatedAt: new Date()
          })
          .where(and(eq(projects.id, id), eq(projects.userId, ctx.session.user.id)))

        return currentVersion[0]
      })

      return res;
    }),

  getProjectSchema: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const project = await db.query.projects.findFirst({
        where: (project, { eq }) => eq(project.id, input)
      });

      if (!project) {
        return new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found'
        })
      }

      return {
        id: project.id,
        schema: project.schema,
        config: project.config,
        status: project.status,
      }
    }),

  deleteProject: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const project = await db.query.projects.findFirst({
        where: (project, { eq }) => eq(project.id, input)
      });

      if (project?.userId !== ctx.session.user.id) {
        return new TRPCError({
          code: 'FORBIDDEN'
        })
      }
      
      await db.update(projects)
        .set({
          deletedAt: new Date()
        })
        .where(eq(projects.id, input))
    }),
    
  listTrashProjects: protectedProcedure
    .input(z.object({
       limit: z.number().default(20),
       page: z.number().default(1),
       orderBy: z.enum(['asc', 'desc']).default('desc'),
    }))
    .query(async ({ ctx, input }) => {
     const { page, limit, orderBy } = input
 
     const deletedFilter = isNotNull(projects.deletedAt)
     const userFilter = eq(projects.userId, ctx.session.user.id)
 
     const statement = db.select({
       id: projects.id,
       name: projects.name,
       description: projects.description,
       createdAt: projects.createdAt,
       updatedAt: projects.updatedAt,
       isStar: projects.isStar,
       isPublish: projects.isPublish,
     }).from(projects)
      .limit(limit)
      .offset((page - 1) * limit)
      .where(and(deletedFilter, userFilter))
 
     statement.orderBy(orderBy === 'desc' ? desc(projects.createdAt) : asc(projects.createdAt))
 
     const result = await statement
     
     const projectsCountRes = await db.select({ count: count() }).from(projects).where(and(deletedFilter, userFilter));
 
     return {
       items: result,
       size: limit,
       page: page,
       total: projectsCountRes[0].count
     }
    }),

  recoverProjects: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input, ctx }) => {
      const projectsResult = await db.query.projects.findMany({
        where: (project, { inArray, and, eq }) => and(inArray(project.id, input), eq(project.userId, ctx.session.user.id))
      });

      if (projectsResult.length !== input.length) {
        return new TRPCError({
          code: 'FORBIDDEN'
        })
      }

      await db.update(projects)
        .set({
          deletedAt: null
        })
        .where(inArray(projects.id, input))
    }),
  
  hardDeleteProjects: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input, ctx }) => {
      const projectsResult = await db.query.projects.findMany({
        where: (project, { inArray, and, eq }) => and(inArray(project.id, input), eq(project.userId, ctx.session.user.id))
      })
      
      if (projectsResult.length !== input.length) {
        return new TRPCError({
          code: 'FORBIDDEN'
        })
      }

      await db.delete(projects)
        .where(inArray(projects.id, input))
    })
})