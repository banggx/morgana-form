import { pgTable, text, timestamp, boolean, integer, serial, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const form = pgTable('form', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  schema: text('schema').notNull(),
  status: varchar('status', { length: 32 }).notNull().default('draft'), // draft | published | archived | deleted
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  publishedAt: timestamp('published_at', { withTimezone: true }).nullable(),
  archivedAt: timestamp('archived_at', { withTimezone: true }).nullable(),
  restoredAt: timestamp('restored_at', { withTimezone: true }).nullable(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }).nullable(),
});

export const insertFormSchema = createInsertSchema(form);
export const selectFormSchema = createSelectSchema(form);
