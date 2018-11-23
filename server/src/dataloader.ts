import * as DataLoader from 'dataloader';
import { getMongoRepository } from 'typeorm';
import HouseState from './entities/houseState';

interface IFilter {
  createdAt_gte: string;
}

const getHouseStateBydataIds = async (dataIds: string[], filter: IFilter) => {
  const repository = getMongoRepository(HouseState);
  const houseState = await repository
    .aggregate([
      { $match: { dataid: { $in: dataIds } } },
      { $match: { createdAt: { $gte: filter.createdAt_gte  } }},
    ])
    .group({
      _id: '$dataid',
      powerUsage: { $sum: '$powerUsage' },
      waterUsage: { $sum: '$waterUsage' },
      gasUsage: { $sum: '$gasUsage' },
    })
    .toArray();
  return houseState;
};

export const createHouseStateDataLoader = ({ filter }: any) => (
  new DataLoader<string, HouseState>(
    (ids: string[]) => (getHouseStateBydataIds(ids, filter)),
  )
);
