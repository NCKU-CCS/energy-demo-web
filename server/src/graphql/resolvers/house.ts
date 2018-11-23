import * as uuid from 'uuid';
import { getMongoRepository } from 'typeorm';
import * as DataLoader from 'dataloader';
import HouseState from '../../entities/houseState';
import House from '../../entities/house';
interface IArgs {
  house: {
    houseID: string;
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
      async reducedHouseState(parent: any, args: IArgs, { houseStateDataLoader }: {
        houseStateDataLoader: DataLoader<string, HouseState>,
      }) {
        const reducerHouseState = await houseStateDataLoader.load(parent.houseID);
        if (reducerHouseState) {
          reducerHouseState.houseID = parent.houseID;
          return reducerHouseState;
        }
        return {};
      },
    },
  },
};
