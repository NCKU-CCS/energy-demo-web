import { gql } from 'apollo-server-koa';
import HouseState from './types/houseState';
import House from './types/house';

const typeDefs = gql`
  input Filter {
    createdAt_gte: String!
  }

  type Query {
    getHouseStates(
      dataid: String!
      filter: Filter
    ): [HouseState]

    Houses(
      filter: Filter
    ): [House]
  }

  type Mutation {
    createHouseStates(
      houseStates: [NewHouseState]!
    ): [HouseState]

    createHouse(
      house: NewHouse!
    ): House
  }
`;

export default [typeDefs, HouseState, House];
