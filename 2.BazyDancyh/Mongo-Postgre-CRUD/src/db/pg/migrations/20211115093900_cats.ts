import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      return knex.schema.createTable('cats', (table) => {
        table.increments('id');
        table.string('cat_id').notNullable().unique();
        table.string('name').notNullable();
        table.enum('gender', ['male', 'female']).notNullable();
        table.string('color').notNullable();
        table.integer('age').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cats');
}

