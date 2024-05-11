import { sql, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const boards = sqliteTable("boards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).default(true),
});

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).default(true),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  boardId: integer("boardId")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
});

export const boardRelations = relations(boards, ({ many }) => ({
  items: many(items),
  columns: many(columns),
}));

export const itemRelations = relations(items, ({ one, many }) => ({
  columnValues: many(columnValues),
  board: one(boards, {
    fields: [items.boardId],
    references: [boards.id],
  }),
  replies: many(replies),
}));

export const replies = sqliteTable("replies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text"),
  parentReplyId: integer("parentReplyId"),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
});

export const replyRelations = relations(replies, ({ one }) => ({
  parentReply: one(replies, {
    fields: [replies.id],
    references: [replies.parentReplyId],
  }),
  item: one(items, {
    fields: [replies.itemId],
    references: [items.id],
  }),
}));

export const columns = sqliteTable("columns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  settings: text("settings", { mode: "json" }),
  type: text("type").notNull(),
  isActive: integer("isActive", { mode: "boolean" }).default(true),
  boardId: integer("boardId")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
});

export const columnRelations = relations(columns, ({ one, many }) => ({
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
  columnValues: many(columnValues),
}));

export const columnValues = sqliteTable("columnValues", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  value: text("value"),
  itemId: integer("itemId")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  columnId: integer("columnId")
    .notNull()
    .references(() => columns.id, { onDelete: "cascade" }),
});

export const columnValueRelations = relations(columnValues, ({ one }) => ({
  column: one(columns, {
    fields: [columnValues.columnId],
    references: [columns.id],
  }),
  item: one(items, {
    fields: [columnValues.itemId],
    references: [items.id],
  }),
}));