import { gql } from 'apollo-server-koa';
import Egauge from './types/egauge';
import House from './types/house';

const typeDefs = gql`
  type Query {
    getEgauges(
      dataid: String!
      filter: Filter
    ): [Egauge]

    Houses: [House]
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
