import type { APIRoute } from "astro";
import { db } from "@db/drizzle";
import { boards } from "@db/schema";
import type { InsertBoard } from "@db/types";
import { eq } from "drizzle-orm";

const getSingleBoard = (id: number) =>
  db.select().from(boards).where(eq(boards.id, id));
const getMultipleBoards = () => db.select().from(boards);
const insertSingleBoard = (newBoard: InsertBoard) =>
  db.insert(boards).values(newBoard).returning();
const insertMultipleBoards = (newBoards: InsertBoard[]) =>
  db.insert(boards).values(newBoards).returning();
const updateBoardName = (name: string, id: number) =>
  db.update(boards).set({ name: name }).where(eq(boards.id, id)).returning();
const updateBoardActive = (isActive: boolean, id: number) =>
  db
    .update(boards)
    .set({ isActive: isActive })
    .where(eq(boards.id, id))
    .returning();
const deleteSingleBoard = (id: number) =>
  db.delete(boards).where(eq(boards.id, id)).returning();

export const GET: APIRoute = async ({ params, request }) => {
  const boards = await getMultipleBoards();
  return new Response(
    JSON.stringify({
      boards,
      message: "This was a GET!",
    }),
  );
};

export const POST: APIRoute = async ({ request }) => {
  const newBoard = await insertSingleBoard({
    name: "new Board",
    isActive: true,
  });
  return new Response(
    JSON.stringify({
      newBoard,
      message: "This was a POST!",
    }),
  );
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const id = Number(params.id);
  const removedBoard = await deleteSingleBoard(id);
  return new Response(
    JSON.stringify({
      message: "This was a DELETE!",
    }),
  );
};
