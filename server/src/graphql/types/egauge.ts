import { gql } from 'apollo-server-koa';

const Egauge = gql`
  type Egauge {
    id: ID
    dataid: String!
    use: Float!
    gen: Float!
    grid: Float!
    createdAt: String!
  }

  input NewEgauge {
    dataid: String!
    use: Float!
    gen: Float!
    grid: Float!
    createdAt: String!
  }
`;

export default Egauge;
