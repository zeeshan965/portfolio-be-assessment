import { ApolloServer, Config as ApolloServerConfig } from 'apollo-server-koa';

import { createSchema } from './createSchema';
import { ExceptionHandler } from './exception.handler';

export default function createApolloServer(apolloServerConfig?: ApolloServerConfig) {
  return new ApolloServer({
    debug: true,
    schema: createSchema(),
    formatError: ExceptionHandler,
    ...apolloServerConfig,
  });
}
