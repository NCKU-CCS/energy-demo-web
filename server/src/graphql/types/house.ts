import { gql } from 'apollo-server-koa';

const House = gql`
  type House {
    id: ID
    dataid: String!
    lat: Float!
    lng: Float!
    houseState: [HouseState]
    reducedHouseState: HouseState
  }

  input NewHouse {
    dataid: String!
    lat: Float!
    lng: Float!
  }
`;

export default House;
