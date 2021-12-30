import Meal from '../db/Mongo/Meal';
import postDb from '../db/pg/db';

export class TextSearchHandler {
    public static async findDishesByText(text: string) {
        const mongoResult = await this.findDishesInMongo(text);
        const postgresResult = await this.findDishesInPostgres(text);
        return {mongoResult, postgresResult};
    }

    private static async findDishesInMongo(text: string) {
        if(text.length < 2) return 'I need at least 3 characters to start search';
        const searchedObject = await Meal.find({$text: {$search: text}});

        return searchedObject;
    }
    private static async findDishesInPostgres(text: string) {
        if(text.length < 2) return 'I need at least 3 characters to start search';

        const searchedText = await postDb.raw(`select 
        "idMeal", 
        "strMeal", 
        "strDrinkAlternate", 
        "strCategory", 
        "strArea", 
        "strInstructions", 
        "strMealThumb", 
        "strTags",
        "strYoutube",
        "strIngredient1",
        "strIngredient2",
        "strIngredient3",
        "strIngredient4",
        "strIngredient5",
        "strIngredient6",
        "strIngredient7",
        "strIngredient8",
        "strIngredient9",
        "strIngredient10",
        "strIngredient11",
        "strIngredient12",
        "strIngredient13",
        "strIngredient14",
        "strIngredient15",
        "strIngredient16",
        "strIngredient17",
        "strIngredient18",
        "strIngredient19",
        "strIngredient20",
        "strMeasure1",
        "strMeasure2",
        "strMeasure3",
        "strMeasure4",
        "strMeasure5",
        "strMeasure6",
        "strMeasure7",
        "strMeasure8",
        "strMeasure9",
        "strMeasure10",
        "strMeasure11",
        "strMeasure12",
        "strMeasure13",
        "strMeasure14",
        "strMeasure15",
        "strMeasure16",
        "strMeasure17",
        "strMeasure18",
        "strMeasure19",
        "strMeasure20",
        "strSource",
        "strImageSource",
        "strCreativeCommonsConfirmed",
        "dateModified"
         from public.meals where to_tsvector('pg_catalog.english', "fullData") @@ to_tsquery('${text}')`);
        return searchedText.rows;
    }
}