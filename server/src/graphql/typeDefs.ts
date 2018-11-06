import Egauge from './types/egauge';
import { gql } from 'apollo-server-koa';

const typeDefs = gql`
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

export default [typeDefs, Egauge];
