import Meal from '../db/Mongo/Meal';
import postDb from '../db/pg/db';
import { getTwoUniqueSetsOfMeals } from './getMeals';
import { IMeal, PostgresMeal } from '../Types/types';

export const clearDBs = () => {
    Meal.deleteMany({}, () => {
        console.log('Mongo cleared.')
    });
    postDb('meals').where({}).del()
    .then(() => console.log('Postgres cleared.'))
    ;
}

export const insertMealsInDbs = async () => {
    const dataForDBs = await getTwoUniqueSetsOfMeals();
    const dataForMongo = dataForDBs?.setOne as IMeal[];
    const dataForPostgres = dataForDBs?.setTwo as IMeal[];
    
    Meal.create(dataForMongo);
    console.log("Mongo database set.");

    for(let i=0; i<dataForPostgres.length;i++) {
        postDb<PostgresMeal>('meals').insert({
            idMeal: dataForPostgres[i].idMeal,
            strMeal: dataForPostgres[i].strMeal,
            strDrinkAlternate: dataForPostgres[i].strDrinkAlternate,
            strCategory: dataForPostgres[i].strCategory,
            strArea: dataForPostgres[i].strArea,
            strInstructions: dataForPostgres[i].strInstructions,
            strMealThumb: dataForPostgres[i].strMealThumb,
            strTags: dataForPostgres[i].strTags,
            strYoutube: dataForPostgres[i].strYoutube,
            strIngredient1: dataForPostgres[i].strIngredient1,
            strIngredient2: dataForPostgres[i].strIngredient2,
            strIngredient3: dataForPostgres[i].strIngredient3,
            strIngredient4: dataForPostgres[i].strIngredient4,
            strIngredient5: dataForPostgres[i].strIngredient5,
            strIngredient6: dataForPostgres[i].strIngredient6,
            strIngredient7: dataForPostgres[i].strIngredient7,
            strIngredient8: dataForPostgres[i].strIngredient8,
            strIngredient9: dataForPostgres[i].strIngredient9,
            strIngredient10: dataForPostgres[i].strIngredient10,
            strIngredient11: dataForPostgres[i].strIngredient11,
            strIngredient12: dataForPostgres[i].strIngredient12,
            strIngredient13: dataForPostgres[i].strIngredient13,
            strIngredient14: dataForPostgres[i].strIngredient14,
            strIngredient15: dataForPostgres[i].strIngredient15,
            strIngredient16: dataForPostgres[i].strIngredient16,
            strIngredient17: dataForPostgres[i].strIngredient17,
            strIngredient18: dataForPostgres[i].strIngredient18,
            strIngredient19: dataForPostgres[i].strIngredient19,
            strIngredient20: dataForPostgres[i].strIngredient20,
            strMeasure1: dataForPostgres[i].strMeasure1,
            strMeasure2: dataForPostgres[i].strMeasure2,
            strMeasure3: dataForPostgres[i].strMeasure3,
            strMeasure4: dataForPostgres[i].strMeasure4,
            strMeasure5: dataForPostgres[i].strMeasure5,
            strMeasure6: dataForPostgres[i].strMeasure6,
            strMeasure7: dataForPostgres[i].strMeasure7,
            strMeasure8: dataForPostgres[i].strMeasure8,
            strMeasure9: dataForPostgres[i].strMeasure9,
            strMeasure10: dataForPostgres[i].strMeasure10,
            strMeasure11: dataForPostgres[i].strMeasure11,
            strMeasure12: dataForPostgres[i].strMeasure12,
            strMeasure13: dataForPostgres[i].strMeasure13,
            strMeasure14: dataForPostgres[i].strMeasure14,
            strMeasure15: dataForPostgres[i].strMeasure15,
            strMeasure16: dataForPostgres[i].strMeasure16,
            strMeasure17: dataForPostgres[i].strMeasure17,
            strMeasure18: dataForPostgres[i].strMeasure18,
            strMeasure19: dataForPostgres[i].strMeasure19,
            strMeasure20: dataForPostgres[i].strMeasure20,
            strSource: dataForPostgres[i].strSource,
            strImageSource: dataForPostgres[i].strImageSource,
            strCreativeCommonsConfirmed: dataForPostgres[i].strCreativeCommonsConfirmed,
            dateModified: dataForPostgres[i].dateModified,
            fullData: dataForPostgres[i]
        })
        .then(() => {})
        .catch(err => err);
    }
    
    console.log("Postgres database set.");
}