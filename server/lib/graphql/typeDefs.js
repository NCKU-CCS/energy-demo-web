"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egauge_1 = require("./types/egauge");
const apollo_server_koa_1 = require("apollo-server-koa");
const typeDefs = apollo_server_koa_1.gql `
  type Query {
    Egauges(
      dataid: String
    ): [Egauge]
  }

  type Mutation {
    createEgauge(
      egauge: NewEgauge!
    ): Egauge
  }
`;
exports.default = [typeDefs, egauge_1.default];
