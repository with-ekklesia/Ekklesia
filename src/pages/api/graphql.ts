import type { APIRoute } from "astro";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "drizzle-graphql";

// db - your drizzle instance, schema - your drizzle tables
import { db } from "../../db/drizzle";

const { schema } = buildSchema(db);

//const yoga = createYoga({ schema })
const { handleRequest } = createYoga({
  schema,
  graphiql: true,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: {
    Response,
    Request,
  },
});

export const GET: APIRoute = async (context) => {
  const { request } = context;
  return handleRequest(request, context);
};

export const POST: APIRoute = async (context) => {
  const { request } = context;
  return handleRequest(request, context);
};
