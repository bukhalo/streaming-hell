import { GraphQLServer } from 'graphql-yoga';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';

const context = req => ({
  ...req
});

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context
});

const options = {
  port: process.env.GRAPHQL_PORT,
  endpoint: process.env.GRAPHQL_ENDPOINT,
  playground: process.env.NODE_ENV === 'production' ? false : process.env.GRAPHQL_ENDPOINT,
  tracing: process.env.NODE_ENV !== 'production',
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true
  }
};

server.start(options, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.GRAPHQL_PORT}${process.env.GRAPHQL_ENDPOINT}`
  )
);
