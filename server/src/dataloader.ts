import * as DataLoader from 'dataloader';
import { getMongoRepository } from 'typeorm';
import Egauge from './entities/egauge';

const getEgaugesBydataIds = async (dataIds: string[]) => {
  const repository = getMongoRepository(Egauge);
  const egauge = await repository
    .aggregate([
      { $match: { dataid: { $in: dataIds } } },
    ])
    .group({
      _id: '$dataid',
      powerUsage: { $sum: '$powerUsage' },
      waterUsage: { $sum: '$waterUsage' },
      gasUsage: { $sum: '$gasUsage' },
    })
    .toArray();
  return egauge;
};

export const createEgaugeDataLoader = () => (
  new DataLoader<string, Egauge>(
    (ids: string[]) => (getEgaugesBydataIds(ids)),
  )
);
