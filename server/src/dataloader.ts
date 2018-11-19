import * as DataLoader from 'dataloader';
import { getMongoRepository } from 'typeorm';
import Egauge from './entities/egauge';

interface IFilter {
  createdAt_gte: string;
}

const getEgaugesBydataIds = async (dataIds: string[], filter: IFilter) => {
  const repository = getMongoRepository(Egauge);
  const egauge = await repository
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
  return egauge;
};

export const createEgaugeDataLoader = ({ filter }: any) => (
  new DataLoader<string, Egauge>(
    (ids: string[]) => (getEgaugesBydataIds(ids, filter)),
  )
);
