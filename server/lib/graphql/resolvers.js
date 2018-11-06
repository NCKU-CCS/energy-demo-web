"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egauges_1 = require("./resolvers/egauges");
const resolvers = {
    Query: Object.assign({}, egauges_1.egaugesResolver.Query),
    Mutation: Object.assign({}, egauges_1.egaugesResolver.Mutation),
};
exports.default = resolvers;
