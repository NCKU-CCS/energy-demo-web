import { gql } from 'apollo-server-koa';

const House = gql`
  type House {
    id: ID
    houseID: String!
    lat: Float!
    lng: Float!
    houseStates: [HouseState]
    reducedHouseState: HouseState
  }

  input NewHouse {
    houseID: String!
    lat: Float!
    lng: Float!
  }
`;

export default House;
