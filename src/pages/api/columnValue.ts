import { db } from "@db/drizzle";
import { columnValues } from "@db/schema";
import type { APIRoute } from "astro"
import { eq } from "drizzle-orm";

const getSingleColumnValue = (id: number) =>
  db.select().from(columnValues).where(eq(columnValues.id, id));

const getMultipleColumnValues = () =>
  db.select().from(columnValues);

const insertSingleColumnValue = (newColumnValue: any) =>
  db.insert(columnValues).values(newColumnValue).returning();

const insertMultipleColumnValues = (newColumnValues: any[]) =>
  db.insert(columnValues).values(newColumnValues).returning();

const updateColumnValue = (value: string, id: number) =>
  db.update(columnValues).set({ value: value }).where(eq(columnValues.id, id)).returning();

const deleteSingleColumnValue = (id: number) =>
  db.delete(columnValues).where(eq(columnValues.id, id)).returning();

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  if (id) {
    const columnValue = await getSingleColumnValue(Number(id));
    return new Response(JSON.stringify(columnValue));
  } else {
    const columnValues = await getMultipleColumnValues();
    return new Response(JSON.stringify(columnValues));
  }
}

export const POST: APIRoute = async ({ request }) => {
  const newColumnValue = await request.json();
  const result = await insertSingleColumnValue(newColumnValue);
  return new Response(JSON.stringify(result));
}

export const DELETE: APIRoute = async ({ params, request }) => {
  const { id } = params;
  await deleteSingleColumnValue(Number(id));
  return new Response(JSON.stringify({ message: `Column value with id ${id} deleted successfully!` }));
}

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const updatedColumnValue = await request.json();
  await updateColumnValue(updatedColumnValue.value, Number(id));
  return new Response(JSON.stringify({ message: `Column value with id ${id} updated successfully!` }));
}