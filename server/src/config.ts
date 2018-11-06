export interface IDBConifg {
  host: string;
  database: string;
  port: number;
}

interface IConfig {
  env: string;
  db: IDBConifg;
}

const defaultConfigs = {
  env: 'development',
  db: {
    host: 'localhost',
    database: 'energydemo',
    port: 27017,
  },
};

const productionConfigs = {
  env: 'production',
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
  },
};

export default (): IConfig => {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return {...defaultConfigs, ...productionConfigs};
    default:
      return defaultConfigs;
  }
};
