import type { APIRoute } from "astro"
import { items } from "@db/schema";
import type { InsertItem, SelectItem } from "@db/types";
import { eq } from "drizzle-orm";
import { db } from "@db/drizzle";
import { Effect, pipe } from "effect";

const getMultipleItems = (boardId: number) => db.select().from(items).where(eq(items.boardId, boardId));
const insertSingleItem = (newItem: InsertItem) => db.insert(items).values(newItem).returning();
const insertMultipleItems = (newItems: InsertItem[]) => db.insert(items).values(newItems).returning();
const deleteSingleItem = (id: number) => db.delete(items).where(eq(items.id, id)).returning();

const getItem = (id:number) => Effect.tryPromise({
  try: () => db.select().from(items).where(eq(items.id, id)),
  catch: (unknown) => new Error(`something went wrong ${unknown}`)
});


export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const boardId = Number(id);
  const result = await getMultipleItems(boardId);
  return new Response(JSON.stringify({ items: result }));
};
  
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { newItem } = body;
  if (Array.isArray(newItem)) {
    const result = await insertMultipleItems(newItem);
    return new Response(JSON.stringify({ items: result }));
  } else {
    const result = await insertSingleItem(newItem);
    return new Response(JSON.stringify({ item: result }));
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  const result = await deleteSingleItem(Number(id));
  return new Response(JSON.stringify({ item: result }));
};

export const ALL: APIRoute = ({ request }) => {
  return new Response(JSON.stringify({
      message: `This was a ${request.method}!`
    })
  )
}