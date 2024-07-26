// src/actions/index.ts
import { defineAction, z } from "astro:actions";
import type { InsertBoard } from "@db/types";
import { db } from "@db/drizzle";
import * as tables from "@db/schema";

const insertSingleBoard = (newBoard: InsertBoard) =>
    db.insert(tables.boards).values(newBoard).returning();


export const server = {
  boards: defineAction({
    // accept: "form",
    input: z.object({
      name: z.string(),
      isActive: z.boolean().default(true),
    }),
    handler: async ({ name, isActive }) => {
      // call a mailing service, or store to a database
      const newBoard = await insertSingleBoard({ name, isActive });
      return { board: newBoard };
    },
  }),
};