import { TypeormConfig } from './typeorm-config.type';

export const typeormConfiguration = (): TypeormConfig => {
  return {
    typeorm: {
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      db: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
    },
  };
};

