import configs from './knexfile';
import knex from 'knex';


const Knex = knex(configs);

export default Knex;