import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, serial, boolean, primaryKey, uuid, varchar, unique, index } from 'drizzle-orm/pg-core'
import type { AdapterAccount } from "next-auth/adapters";

export const users = pgTable('user', {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
export const userRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  files: many(files),
  llms: many(llms),
}))

export const accounts = pgTable('account', {
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccount>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({
    columns: [account.provider, account.providerAccountId]
  }),
}))

export const sessions = pgTable('session', {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable('verificationToken', {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (verficationToken) => ({
  compositePk: primaryKey({
    columns: [verficationToken.identifier, verficationToken.token],
  }),
}))

export const authenticators = pgTable('authenticator', {
  credentialID: text("credentialID").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  providerAccountId: text("providerAccountId").notNull(),
  credentialPublicKey: text("credentialPublicKey").notNull(),
  counter: integer("counter").notNull(),
  credentialDeviceType: text("credentialDeviceType").notNull(),
  credentialBackedUp: boolean("credentialBackedUp").notNull(),
  transports: text("transports"),
}, (authenticator) => ({
  compositePK: primaryKey({
    columns: [authenticator.userId, authenticator.credentialID],
  }),
}))

export const projects = pgTable('project', {
  id: uuid("id").notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  isStar: boolean('is_star').default(false),
  config: text('config').default(''),
  schema: text('schema'),
  isPublish: boolean('is_publish').default(false),
  userId: text("user_id").notNull(),
  status: integer('status').notNull().default(0), // 项目状态: 0-未发布, 1-已发布, 2-已下架
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
}, (project) => ({
  compoundNameKey: unique().on(project.id, project.name)
}))
export const projectRelations = relations(projects, ({ one, many }) => ({
  user: one(users, { fields: [projects.userId], references: [users.id] }),
  versions: many(versions),
  forms: many(formData),
}))

export const versions = pgTable('versions', {
  id: uuid("id").notNull().primaryKey(),
  version: serial('version'),
  isOnline: boolean('is_online').default(false),
  config: text('config'),
  schema: text('schema'),
  projectId: uuid("project_id").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
}, (version) => ({
  compoundNameKey: unique().on(version.projectId, version.version)
}))
export const versionRelations = relations(versions, ({ one, many }) => ({
  project: one(projects, { fields: [versions.projectId], references: [projects.id] }),
  forms: many(formData),
}))

export const files = pgTable('files', {
  id: uuid("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
  path: varchar("path", { length: 2048 }).notNull(),
  url: varchar("url", { length: 2048 }).notNull(),
  userId: text("user_id").notNull(),
  contentType: varchar("content_type", { length: 100 }).notNull(),
}, (table) => ({
  cursorIdx: index("cursor_idx").on(table.id, table.createdAt),
}))
export const filesRelations = relations(files, ({ one }) => ({
  files: one(users, { fields: [files.userId], references: [users.id] }),
}));

export const formData = pgTable('form_data', {
  id: uuid("id").notNull().primaryKey(),
  finger: varchar("finger", { length: 255 }).notNull(),
  ip: varchar("ip", { length: 255 }).notNull(),
  browser: varchar("browser", { length: 20 }).notNull(),
  browserVersion: varchar("browser_version", { length: 20 }).notNull(),
  os: varchar("os", { length: 20 }).notNull(),
  osVersion: varchar("os_version", { length: 20 }).notNull(),
  formId: uuid("form_id").notNull(),
  versionId: uuid("version_id").notNull(),
  city: varchar("city", { length: 255 }),
  data: text("data").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
}, (formData) => ({
  compoundNameKey: unique().on(formData.formId, formData.versionId, formData.finger)
}))
export const formDataRelations = relations(formData, ({ one }) => ({
  project: one(projects, { fields: [formData.formId], references: [projects.id] }),
  version: one(versions, { fields: [formData.versionId], references: [versions.id] }),
}))

export const llms = pgTable('llms', {
  id: uuid("id").notNull().primaryKey(),
  userId: text("user_id").notNull(),
  prompt: text("prompt").notNull(),
  result: text("result").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  deletedAt: timestamp("deleted_at", { mode: "date" }),
})
export const llmRelations = relations(llms, ({ one }) => ({
  llm: one(users, { fields: [llms.userId], references: [users.id] }),
}))