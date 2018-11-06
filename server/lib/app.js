"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const apollo_server_koa_1 = require("apollo-server-koa");
const http = require("http");
const socketIO = require("socket.io");
require("reflect-metadata");
const config_1 = require("./config");
const db = require("./db");
const routers_1 = require("./routers");
const resolvers_1 = require("./graphql/resolvers");
const typeDefs_1 = require("./graphql/typeDefs");
exports.createApp = async () => {
    const config = config_1.default();
    await db.connect(config.db);
    const app = new Koa();
    app.use(async (ctx, next) => {
        try {
            await next();
        }
        catch (err) {
            console.log(err);
            const errorCode = (err.isBoom && err.data && err.data.code) ? err.data.code : 'INTERNAL_ERROR';
            const statusCode = (err.isBoom && err.output && err.output.statusCode) ? err.output.statusCode : err.status || 500;
            ctx.status = statusCode;
            ctx.body = { code: errorCode, message: err.message };
        }
    });
    app.use(bodyParser());
    app.use(routers_1.routers.routes());
    const server = http.createServer(app.callback());
    const io = socketIO(server);
    io.on('connection', () => {
        console.log('Socket connected.');
    });
    const apolloServer = new apollo_server_koa_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        context: () => ({
            io,
        }),
    });
    apolloServer.applyMiddleware({ app });
    return server;
};
