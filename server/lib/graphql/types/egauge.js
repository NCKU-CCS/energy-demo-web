"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const Egauge = apollo_server_koa_1.gql `
  type Egauge {
    id: ID
    dataid: String!
    use: Float!
    gen: Float!
    grid: Float!
    createdAt: String!
  }

  input NewEgauge {
    dataid: String!
    use: Float!
    gen: Float!
    grid: Float!
    createdAt: String!
  }
`;
exports.default = Egauge;
