import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('nations', (table) => {
        table.increments('id').notNullable();
        table.string('europe');
        table.string('africa');
        table.string('asia');
        table.string('americas');
        table.string('oceania');
        table.string('world');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('nations');
}

