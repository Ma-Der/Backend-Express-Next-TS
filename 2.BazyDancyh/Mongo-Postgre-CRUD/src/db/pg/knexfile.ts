import { pgUser, pgPass } from '../../Config/envVar';
const development = {
    client: 'pg',
    connection: {
      database: "Cats",
      user: pgUser,
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