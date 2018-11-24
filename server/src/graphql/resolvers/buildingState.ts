import * as socketIO from 'socket.io';
import { getMongoRepository } from 'typeorm';

import BuildingState from '../../entities/buildingState';

interface IArgs {
  buildingID: string;
  filter?: {
    createdAt_gte: string;
  };
}

export const buildingStateResolver = {
  Query: {
    async getBuildingStates(_: any, { buildingID, filter }: IArgs) {
      const aggregateOptions = [];

      if (buildingID) {
        aggregateOptions.push({
          $match: { buildingID },
        });
      }

      if (filter) {
        aggregateOptions.push({
          $match: { createdAt: { $gte: filter.createdAt_gte  } },
        });
      }

      const buildingStates = await getMongoRepository(BuildingState)
        .aggregate(aggregateOptions)
        .toArray();

      return buildingStates;
    },
  },
  Mutation: {
    async createBuildingStates(_: any, args: { buildingStates: BuildingState[] }, { io }: { io: socketIO.Server }) {
      const repository = getMongoRepository(BuildingState);
      const rep = await repository
        .insertMany(args.buildingStates);
      io.emit('buildingStateAdded', rep.ops);
      return rep.ops;
    },
  },
};
