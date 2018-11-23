import { gql } from 'apollo-server-koa';

const HouseState = gql`
  type HouseState {
    id: ID
    dataid: String!
    powerUsage: Float!
    waterUsage: Float!
    gasUsage: Float!
    createdAt: String!
  }

  input NewHouseState {
    dataid: String!
    powerUsage: Float!
    waterUsage: Float!
    gasUsage: Float!
    createdAt: String!
  }
`;

export default HouseState;
