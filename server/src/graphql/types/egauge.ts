import { gql } from 'apollo-server-koa';

const Egauge = gql`
  type Egauge {
    id: ID
    dataid: String!
    powerUsage: Float!
    waterUsage: Float!
    gasUsage: Float!
    createdAt: String!
  }

  input NewEgauge {
    dataid: String!
    powerUsage: Float!
    waterUsage: Float!
    gasUsage: Float!
    createdAt: String!
  }
`;

export default Egauge;
