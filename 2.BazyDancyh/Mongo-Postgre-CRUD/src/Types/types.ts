import { Knex } from 'knex';

export interface IKnexConfig {
    [key: string]: Knex.Config;
}

export type CatGender = 'male' | 'female';