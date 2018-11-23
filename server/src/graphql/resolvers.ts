import { houseStateResolver } from './resolvers/houseState';
import { houseResolver } from './resolvers/house';
import { buildingStateResolver } from './resolvers/buildingState';

const resolvers = {
  Query: {
    ...houseStateResolver.Query,
    ...houseResolver.Query,
    ...buildingStateResolver.Query,
  },
  Mutation: {
    ...houseStateResolver.Mutation,
    ...houseResolver.Mutation,
    ...buildingStateResolver.Mutation,
  },
  ...houseResolver.Others,
};

export default resolvers;
