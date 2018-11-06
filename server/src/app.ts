import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import { ApolloServer } from 'apollo-server-koa';
import * as http from 'http';
import * as socketIO from 'socket.io';
import 'reflect-metadata';

import createConfig from './config';
import * as db from './db';
import { routers } from './routers';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

export const createApp = async (): Promise<http.Server> => {
  const config = createConfig();
  // Connect db
  await db.connect(config.db);

  const app = new Koa();

  // Error handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      const errorCode = (err.isBoom && err.data && err.data.code) ? err.data.code : 'INTERNAL_ERROR';
      const statusCode =
        (err.isBoom && err.output && err.output.statusCode) ? err.output.statusCode : err.status || 500;

      ctx.status = statusCode;
      ctx.body = {code: errorCode, message: err.message};
    }
  });
  app.use(bodyParser());
  app.use(routers.routes());

  // Socket
  const server = http.createServer(app.callback());
  const io = socketIO(server);
  io.on('connection', () => {
    // tslint:disable-next-line:no-console
    console.log('Socket connected.');
  });

  // Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      io,
    }),
  });
  apolloServer.applyMiddleware({ app });

  return server;
};
