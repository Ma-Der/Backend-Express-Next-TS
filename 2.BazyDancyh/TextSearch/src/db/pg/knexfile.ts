import { pgUser, pgPass } from '../../Config/envVar';
const development = {
    client: 'pg',
    connection: {
      database: "Meals",
      user: "postgres",
      password: pgPass,
      host: 'localhost',
      port: "5432"
    },
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "knex_migrations"
    }
};


export default development;