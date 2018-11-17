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
}

export const egaugeResolver = {
  Query: {
    async getEgauges(_: any, args: IArgs) {
      const options = args || {};
      const repository = getMongoRepository(Egauge);
      return repository.find(options);
    },
  },
  Mutation: {
    async createEgauges(_: any, args: IArgs, { io }: { io: socketIO.Socket }) {
      const repository = getMongoRepository(Egauge);
      const egauges = await repository
        .insertMany(args.egauges);
      io.emit('egaugeAdded', egauges);
      return egauges;
    },
  },
};
