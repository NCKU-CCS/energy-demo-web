import { gql } from 'apollo-server-koa';

const HouseState = gql`
  type HouseState {
    id: ID
    houseID: String!
    powerUsage: Float!
    waterUsage: Float!
    gasUsage: Float!
    createdAt: String!
  }

  input NewHouseState {
    houseID: String!
    powerUsage: Float!
    waterUsage: Float!
    gasUsage: Float!
    createdAt: String!
  }
`;

export default HouseState;
