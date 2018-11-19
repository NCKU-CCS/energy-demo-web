import * as socketIO from 'socket.io';
import { getMongoRepository } from 'typeorm';

import Egauge from '../../entities/egauge';

interface IEgauge {
  dataid?: string;
  createdAt?: string;
  house?: any;
}

interface IArgs {
  egauges: IEgauge[];
  dataid: string;
  filter?: {
    createdAt_gte: string;
  };
}

export const egaugeResolver = {
  Query: {
    async getEgauges(_: any, args: IArgs) {
      const aggregateOptions = [];

      aggregateOptions.push({
        $match: { dataid: args.dataid },
      });

      if (args.filter) {
        aggregateOptions.push({
          $match: { createdAt: { $gte: args.filter.createdAt_gte  } },
        });
      }

      const egauges = await getMongoRepository(Egauge)
        .aggregate(aggregateOptions)
        .toArray();

      return egauges;
    },
  },
  Mutation: {
    async createEgauges(_: any, args: IArgs, { io }: { io: socketIO.Socket }) {
      const repository = getMongoRepository(Egauge);
      const rep = await repository
        .insertMany(args.egauges);
      io.emit('egaugeAdded', rep.ops);
      return rep.ops;
    },
  },
};
