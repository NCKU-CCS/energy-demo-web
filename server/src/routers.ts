import * as Router from 'koa-router';
import * as cors from '@koa/cors';

const corsMid = cors({
  allowHeaders: ['Content-Type'],
});

export const routers = new Router();

// robot
routers.get('/robots.txt', async ctx => {
  ctx.body = 'User-agent: *\nAllow:';
});

routers.all('*', corsMid);
