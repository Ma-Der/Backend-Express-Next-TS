import { IKnexConfig } from '../../Types/types';
import path from 'path';

const configs: IKnexConfig = {
  development: {
    client: "postgresql",
    connection: {
      database: "Cats",
      user: "Maciej",
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(path.resolve() + "./migrations"),
      tableName: "knex_migrations"
    }
  }
};


export default configs;