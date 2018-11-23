import { gql } from 'apollo-server-koa';
import HouseState from './types/houseState';
import House from './types/house';
import BuildingState from './types/buildingState';

const typeDefs = gql`
  input Filter {
    createdAt_gte: String!
  }

  type Query {
    getHouseStates(
      houseID: String!
      filter: Filter
    ): [HouseState]

    Houses(
      filter: Filter
    ): [House]

    getBuildingStates(
      buildingID: String!
      filter: Filter
    ): [BuildingState]
  }

  type Mutation {
    createHouseStates(
      houseStates: [NewHouseState]!
    ): [HouseState]

    createHouse(
      house: NewHouse!
    ): House

    createBuildingStates(
      buildingStates: [NewBuildingState]!
    ): [BuildingState]
  }
`;

export default [typeDefs, HouseState, House, BuildingState];
