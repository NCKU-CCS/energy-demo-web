import * as socketIO from 'socket.io';
import { getMongoRepository } from 'typeorm';

import HouseState from '../../entities/houseState';

interface IHouseState {
  houseID?: string;
  createdAt?: string;
  house?: any;
}

interface IArgs {
  houseStates: IHouseState[];
  houseID: string;
  filter?: {
    createdAt_gte: string;
  };
}

export const houseStateResolver = {
  Query: {
    async getHouseStates(_: any, args: IArgs) {
      const aggregateOptions = [];
      aggregateOptions.push({
        $match: { houseID: args.houseID },
      });

      if (args.filter) {
        aggregateOptions.push({
          $match: { createdAt: { $gte: args.filter.createdAt_gte  } },
        });
      }

      const houseStates = await getMongoRepository(HouseState)
        .aggregate(aggregateOptions)
        .toArray();

      return houseStates;
    },
  },
  Mutation: {
    async createHouseStates(_: any, args: IArgs, { io }: { io: socketIO.Server }) {
      const repository = getMongoRepository(HouseState);
      const rep = await repository
        .insertMany(args.houseStates);
      io.emit('houseStateAdded', rep.ops);
      return rep.ops;
    },
  },
};
