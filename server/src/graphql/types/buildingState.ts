import { gql } from 'apollo-server-koa';

const BuildingState = gql`
  type BuildingState {
    id: ID
    buildingID: String!
    powerUsageLevel: Float!
    createdAt: String!
  }

  input NewBuildingState {
    powerUsageLevel: Float!
    createdAt: String!
  }
`;

export default BuildingState;
