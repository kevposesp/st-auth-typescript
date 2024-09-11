import env from './env';

export default {
  HOST: env.DB_HOST as string,
  USER: env.DB_USER as string,
  PASSWORD: env.DB_PASSWORD as string,
  DB: env.DB_NAME as string,
  DIALECT: env.DB_DIALECT as string
};
