import type { APIRoute } from "astro";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "drizzle-graphql";
import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

// db - your drizzle instance, schema - your drizzle tables
import { db } from "@db/drizzle";
import * as tables from "@db/schema";
import { eq, inArray } from "drizzle-orm";
import type { InsertBoard } from "@db/types";

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
          const boards = await db.select().from(tables.boards);
          return boards;
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: entities.mutations
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
