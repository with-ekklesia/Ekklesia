import type { boards, items, columns, columnValues, replies } from "./schema";

export type InsertBoard = typeof boards.$inferInsert;
export type SelectBoard = typeof boards.$inferSelect;

export type InsertItem = typeof items.$inferInsert;
export type SelectItem = typeof items.$inferSelect;

export type InsertColumn = typeof columns.$inferInsert;
export type SelectColumn = typeof columns.$inferSelect;

export type InsertColumnValue = typeof columnValues.$inferInsert;
export type SelectColumnValue = typeof columnValues.$inferSelect;

export type InsertReplies = typeof replies.$inferInsert;
export type SelectReplies = typeof replies.$inferSelect;
