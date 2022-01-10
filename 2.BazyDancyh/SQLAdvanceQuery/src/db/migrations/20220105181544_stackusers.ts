import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.integer('account_id');
        table.integer('badge_count_gold');
        table.integer('badge_count_silver');
        table.integer('badge_count_bronze');
        table.integer('creation_date');
        table.string('display_name');
        table.string('location');
        table.integer('reputation');
        table.integer('user_id');
        table.enum('user_type', ['unregistered', 'registered', 'moderator', 'team_admin', 'does_not_exist']);
    
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

