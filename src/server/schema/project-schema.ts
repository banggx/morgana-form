import { projects } from '@/server/db/model'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const createProjectSchema = createInsertSchema(projects, {
  name: (schema) => schema.name.max(255),
  description: (schema) => schema.description.max(1024),
}).pick({
  name: true,
  description: true,
})

export const projectSchema = createSelectSchema(projects);
export const projectCanFilterByColumns = projectSchema.omit({
  createdAt: true,
  deletedAt: true,
  updatedAt: true,
  userId: true,
});