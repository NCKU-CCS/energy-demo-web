import * as uuid from 'uuid';
import { getMongoRepository } from 'typeorm';
import * as DataLoader from 'dataloader';
import Egauge from '../../entities/egauge';
import House from '../../entities/house';
interface IArgs {
  house: {
    dataid: string;
    lat: number;
    lng: number;
  };
}

export const houseResolver = {
  Query: {
    async Houses(_: any) {
      const repository = getMongoRepository(House);
      return repository.find();
    },
  },
  Mutation: {
    async createHouse(_: any, args: IArgs) {
      const repository = getMongoRepository(House);
      const house = {
        id: uuid.v4(),
        ...args.house,
      };
      await repository.save(house);
      return house;
    },
  },
  Others: {
    House: {
      async reducedEgauge(parent: any, args: IArgs, { egaugeDataLoader }: {
        egaugeDataLoader: DataLoader<string, Egauge>,
      }) {
        const reducerEgauge = await egaugeDataLoader.load(parent.dataid);
        if (reducerEgauge) {
          reducerEgauge.dataid = parent.dataid;
          return reducerEgauge;
        }
        return {};
      },
    },
  },
};
