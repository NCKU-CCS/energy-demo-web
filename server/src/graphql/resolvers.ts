import { egaugesResolver } from './resolvers/egauges';

const resolvers = {
  Query: {
    ...egaugesResolver.Query,
  },
  Mutation: {
    ...egaugesResolver.Mutation,
  },
};

export default resolvers;
