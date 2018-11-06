import { resolve } from 'path';
import { createConnection } from 'typeorm';
import { IDBConifg } from './config';

export const connect = async (config: IDBConifg) => {
  return createConnection({
    type: 'mongodb',
    host: config.host,
    database: config.database,
    port: config.port,
    entities: [
      resolve(__dirname, './entities/*.ts'),
    ],
    logging: ['error'],
    synchronize: true,
  }).then((...args) => {
    // tslint:disable-next-line:no-console
    console.log('Database connection established');
  });
};
