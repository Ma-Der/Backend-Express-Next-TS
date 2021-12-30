import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("meals", (table) => {
        table.increments('id');
        table.string('idMeal').notNullable().unique();
        table.jsonb('fullData').index('GIN');
        table.string('strMeal');
        table.string('strDrinkAlternate');
        table.string('strCategory');
        table.string('strArea');
        table.text('strInstructions').unique();
        table.string('strMealThumb');
        table.string('strTags');
        table.string('strYoutube');
        table.string('strIngredient1');
        table.string('strIngredient2');
        table.string('strIngredient3');
        table.string('strIngredient4');
        table.string('strIngredient5');
        table.string('strIngredient6');
        table.string('strIngredient7');
        table.string('strIngredient8');
        table.string('strIngredient9');
        table.string('strIngredient10');
        table.string('strIngredient11');
        table.string('strIngredient12');
        table.string('strIngredient13');
        table.string('strIngredient14');
        table.string('strIngredient15');
        table.string('strIngredient16');
        table.string('strIngredient17');
        table.string('strIngredient18');
        table.string('strIngredient19');
        table.string('strIngredient20');
        table.string('strMeasure1');
        table.string('strMeasure2');
        table.string('strMeasure3');
        table.string('strMeasure4');
        table.string('strMeasure5');
        table.string('strMeasure6');
        table.string('strMeasure7');
        table.string('strMeasure8');
        table.string('strMeasure9');
        table.string('strMeasure10');
        table.string('strMeasure11');
        table.string('strMeasure12');
        table.string('strMeasure13');
        table.string('strMeasure14');
        table.string('strMeasure15');
        table.string('strMeasure16');
        table.string('strMeasure17');
        table.string('strMeasure18');
        table.string('strMeasure19');
        table.string('strMeasure20');
        table.string('strSource');
        table.string('strImageSource');
        table.string('strCreativeCommonsConfirmed');
        table.string('dateModified');

    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("meals");
}

