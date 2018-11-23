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
    async getBuildingStates(_: any, args: IArgs) {
      const aggregateOptions = [];
      aggregateOptions.push({
        $match: { buildingID: args.buildingID },
      });

      if (args.filter) {
        aggregateOptions.push({
          $match: { createdAt: { $gte: args.filter.createdAt_gte  } },
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
