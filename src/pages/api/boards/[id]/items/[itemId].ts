import { db } from "@db/drizzle";
import { items } from "@db/schema";
import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";

const getSingleItem = (id : number) => db.select().from(items).where(eq(items.id, id));
const updateItemName = (name: string, id: number) => db.update(items)
    .set({ name: name })
    .where(eq(items.id, id))
    .returning();
const updateItemActive = (isActive: boolean, id: number) => db.update(items)
    .set({ isActive: isActive })
    .where(eq(items.id, id))
    .returning();

export const GET: APIRoute = async ({ params, request }) => {
    const { id, itemId } = params;
    try {
        const result = await getSingleItem(Number(itemId));
        return new Response(JSON.stringify({ item: result }));
    } catch (error) {
        console.error("foo", error);
        return new Response("Internal Server Error");
    }
};


export const PATCH: APIRoute = async ({ params, request }) => {
    const { itemId } = params;
    const body = await request.json();
    const { name, isActive } = body;
    if (name) {
      const result = await updateItemName(name, Number(itemId));
      return new Response(JSON.stringify({ item: result }));
    } else if (typeof isActive !== 'undefined') {
      const result = updateItemActive(isActive, Number(itemId));
      return new Response(JSON.stringify({ item: result }));
    } else {
      return new Response(JSON.stringify({ error: "No field to update" }));
    }
};