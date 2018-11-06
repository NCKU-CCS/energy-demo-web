"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const cors = require("@koa/cors");
const corsMid = cors({
    allowHeaders: ['Content-Type'],
});
exports.routers = new Router();
exports.routers.get('/robots.txt', async (ctx) => {
    ctx.body = 'User-agent: *\nAllow:';
});
exports.routers.all('*', corsMid);
