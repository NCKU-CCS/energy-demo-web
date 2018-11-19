import { gql } from 'apollo-server-koa';
import Egauge from './types/egauge';
import House from './types/house';

const typeDefs = gql`
  input Filter {
    createdAt_gte: String!
  }

  type Query {
    getEgauges(
      dataid: String!
      filter: Filter
    ): [Egauge]

    Houses(
      filter: Filter
    ): [House]
  }

  type Mutation {
    createEgauges(
      egauges: [NewEgauge]!
    ): [Egauge]

    createHouse(
      house: NewHouse!
    ): House
  }
`;

export default [typeDefs, Egauge, House];
