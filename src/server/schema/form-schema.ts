import { formData } from '@/server/db/model'
import { createInsertSchema } from 'drizzle-zod'

export const createFormSchema = createInsertSchema(formData).omit({
  createdAt: true,
  deletedAt: true,
  id: true,
})
