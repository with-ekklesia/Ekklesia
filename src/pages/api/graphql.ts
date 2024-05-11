import type { APIRoute } from "astro";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "drizzle-graphql";
import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

// db - your drizzle instance, schema - your drizzle tables
import { db } from "@db/drizzle";
import * as tables from "@db/schema";
import { eq, inArray } from "drizzle-orm";

// const { schema, entities }
const { entities } = buildSchema(db);

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      boards: {
        type: new GraphQLList(entities.types.BoardsItem),
        args: {
          ids: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
        },
        resolve: async (source, { ids }: { ids: number[]}, context, info) => {
          const boards = [{id: 123, isActive: true, name: "test Board"}];//await db.select().from(tables.boards).where(inArray(tables.boards.id, ids ));
          return boards;
        },
      },
    },
  }),
});

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
