import * as Router from 'koa-router';
import * as cors from '@koa/cors';
import * as socketIO from 'socket.io';
import { houseStateResolver } from './graphql/resolvers/houseState';

const corsMid = cors({
  allowHeaders: ['Content-Type'],
});

export default function createRouters(io: socketIO.Server) {
  const routers = new Router();
  // robot
  routers.get('/robots.txt', async ctx => {
    ctx.body = 'User-agent: *\nAllow:';
  });

  // For non-graphql client post
  routers.post('/house-states', async ctx => {
    const houseStates = await houseStateResolver.Mutation.createHouseStates(
      {}, // unused
      ctx.request.body as any,
      { io },
    );
    ctx.response.body = {
      houseStates,
    };
  });

  routers.all('*', corsMid);

  return routers.routes();
}
