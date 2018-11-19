import * as uuid from 'uuid';
import { getMongoRepository } from 'typeorm';
import House from '../../entities/house';
import Egauge from '../../entities/egauge';
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
      async egauges(parent: any) {
        const { dataid } = parent;
        const repository = getMongoRepository(Egauge);
        const reducerEgauge = await repository
          .aggregate([])
          .match({ dataid })
          .group({
            _id: null,
            powerUsage: { $sum: '$powerUsage' },
            waterUsage: { $sum: '$waterUsage' },
            gasUsage: { $sum: '$gasUsage' },
          })
          .toArray();

        if (reducerEgauge.length > 0) {
          reducerEgauge[0].dataid = dataid;
          return reducerEgauge;
        }

        return [];

        /* tslint:disable */
        // console.log(dataid, sum);

        return repository.find({
          dataid,
        });
      },
    },
  },
};
