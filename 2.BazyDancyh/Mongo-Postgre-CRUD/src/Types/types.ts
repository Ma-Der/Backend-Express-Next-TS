import { Knex } from 'knex';

export interface IKnexConfig {
    [key: string]: Knex.Config;
}

export type TCatGender = 'male' | 'female';

export type TModifyCatParam = 'catId' | 'name' | 'gender' | 'color' | 'age';

export interface ICat {
    cat_id: string;
    name: string;
    gender: TCatGender;
    color: string;
    age: number;
}

export interface PostgreCat extends ICat {
    id: number;
}

export class ICatData {
    name!: string;
    gender!: TCatGender;
    color!: string;
    age!: number;
}