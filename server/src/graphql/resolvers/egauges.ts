import * as uuid from 'uuid';
import { getRepository } from 'typeorm';
import { Egauge } from '../../entities/egauge';
import * as socketIO from 'socket.io';
interface IArgs {
  egauge: {
    dataid?: string;
    createdAt?: string;
  };
}

export const egaugesResolver = {
  Query: {
    async Egauges(_: any, args: IArgs) {
      const options = args || {};
      const repository = getRepository(Egauge);
      return repository.find(options);
    },
  },
  Mutation: {
    async createEgauge(_: any, args: IArgs, { io }: { io: socketIO.Socket }) {
      const repository = getRepository(Egauge);
      const egauge = {
          id: uuid.v4(),
          ...args.egauge,
      };
      await repository.save(egauge);
      io.emit('egaugeAdded', egauge);
      return egauge;
    },
  },
};
