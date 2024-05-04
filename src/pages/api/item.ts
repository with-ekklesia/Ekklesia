import type { APIRoute } from "astro"
import { items, type InsertItem } from "../../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle";

const getSingleItem = (id : number) => db.select().from(items).where(eq(items.id, id));
const getMultipleItems = () => db.select().from(items);
const insertSingleItem = (newBoard: InsertItem) => db.insert(items).values(newBoard).returning();
const insertMultipleItems = (newItems: InsertItem[]) => db.insert(items).values(newItems).returning();
const updateItemName = (name: string, id: number) => db.update(items).set({ name: name }).where(eq(items.id, id)).returning();
const updateItemActive = (isActive: boolean, id: number) => db.update(items).set({ isActive: isActive }).where(eq(items.id, id)).returning();
const deleteSingleItem = (id: number) => db.delete(items).where(eq(items.id, id)).returning();

export const GET: APIRoute = ({ params, request }) => {
    return new Response(JSON.stringify({
        message: "This was a GET!"
      })
    )
  }
  
  export const POST: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: "This was a POST!"
      })
    )
  }
  
  export const DELETE: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: "This was a DELETE!"
      })
    )
  }
  
  export const ALL: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: `This was a ${request.method}!`
      })
    )
  }