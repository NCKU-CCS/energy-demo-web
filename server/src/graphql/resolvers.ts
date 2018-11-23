import { houseStateResolver } from './resolvers/houseState';
import { houseResolver } from './resolvers/house';

const resolvers = {
  Query: {
    ...houseStateResolver.Query,
    ...houseResolver.Query,
  },
  Mutation: {
    ...houseStateResolver.Mutation,
    ...houseResolver.Mutation,
  },
  ...houseResolver.Others,
};

export default resolvers;
