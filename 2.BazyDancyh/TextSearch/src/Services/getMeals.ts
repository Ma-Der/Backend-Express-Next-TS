import axios from "axios";
import { IMeal } from "../Types/types";

export const getTenMeals = async () => {
    let arrayOfMeals=[];
    let uniqueArrayOfMeals = [];
    do {
        const meals = await axios("https://themealdb.com/api/json/v1/1/random.php", {method: 'GET'});
        arrayOfMeals.push(meals.data.meals[0]);
    } while (arrayOfMeals.length < 10)

    uniqueArrayOfMeals = [... new Set(arrayOfMeals)];
    if(uniqueArrayOfMeals.length === 10) { 
        return uniqueArrayOfMeals; 
    } else getTenMeals();    
} 

export const getTwoSetsOfMeals = (setOne: IMeal[], setTwo: IMeal[]) => {

    let checkVariable: boolean = true;

    const sameArr = setOne.map(elOne => {
        setTwo.filter(elTwo => elTwo.idMeal === elOne.idMeal).length === 0 ? 
        elOne.idMeal :
        undefined
    });
    
    sameArr.forEach(el => {
        if(el !== undefined) return checkVariable = false;
    })

    return checkVariable;
}

export const getTwoUniqueSetsOfMeals = async () => {

    const uniqueArrayOfMealsOne = await getTenMeals() as IMeal[];
    const uniqueArrayOfMealsTwo = await getTenMeals() as IMeal[];

    const isUnique = await getTwoSetsOfMeals(uniqueArrayOfMealsOne, uniqueArrayOfMealsTwo);
    if(isUnique) {
        return {setOne: uniqueArrayOfMealsOne, setTwo: uniqueArrayOfMealsTwo};
    } else getTwoUniqueSetsOfMeals();
}