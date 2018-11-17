import { egaugeResolver } from './resolvers/egauge';
import { houseResolver } from './resolvers/house';

const resolvers = {
  Query: {
    ...egaugeResolver.Query,
    ...houseResolver.Query,
  },
  Mutation: {
    ...egaugeResolver.Mutation,
    ...houseResolver.Mutation,
  },
  ...houseResolver.Others,
};

export default resolvers;
