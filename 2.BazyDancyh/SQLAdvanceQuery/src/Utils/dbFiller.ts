import axios from 'axios';
import knex from '../db/db';

const getStackUsers = async (page: number) => {
    let users = [];
    for(let i=1; i <= page; i++) {
        const stackUsers = await axios.get(`https://api.stackexchange.com/2.3/users?page=${i}&pagesize=100&site=stackoverflow`);    
        users.push(stackUsers.data.items);
    }
    return users.flat();
}

export const fillUsersDb = async () => {
    const users = await getStackUsers(5);

    const modifiedUsers = users.map(user => {
        return {
            account_id: user.account_id,
            badge_count_gold: user.badge_counts.gold,
            badge_count_silver: user.badge_counts.silver,
            badge_count_bronze: user.badge_counts.bronze,
            creation_date: user.creation_date,
            display_name: user.display_name,
            location: user.location,
            reputation: user.reputation,
            user_id: user.user_id,
            user_type: user.user_type
        }
    });

    for(let i=0; i < modifiedUsers.length; i++) {
        await knex('users').insert(modifiedUsers[i]);
    }

    return { message: 'Users filled successfully.'};
}

const getEuropeanCountries = async () => {
    const europeanCountries = await axios.get(`https://restcountries.com/v3.1/region/europe`);

    return convertToCountryNames(europeanCountries.data);
}

const getAfricanCountries = async () => {
    const africanCountries = await axios.get(`https://restcountries.com/v3.1/region/africa`);

    return convertToCountryNames(africanCountries.data);
}

const getAmericasCountries = async () => {
    const americasCountries = await axios.get(`https://restcountries.com/v3.1/region/americas`);

    return convertToCountryNames(americasCountries.data);
}

const getAsianCountries = async () => {
    const asianCountries = await axios.get(`https://restcountries.com/v3.1/region/asia`);

    return convertToCountryNames(asianCountries.data);
}

const getOceaniasCountries = async () => {
    const oceaniasCountries = await axios.get(`https://restcountries.com/v3.1/region/oceania`);

    return convertToCountryNames(oceaniasCountries.data);
}

const getWorldsCountries = async () => {
    const europe = await getEuropeanCountries();
    const africa = await getAfricanCountries();
    const americas = await getAmericasCountries();
    const asia = await getAsianCountries();
    const oceania = await getOceaniasCountries();

    let worldCountries = [europe, africa, americas, asia, oceania];

    return worldCountries.flat().sort();
}

export const fillNationsDB = async () => {
    const europe = await getEuropeanCountries();
    const africa = await getAfricanCountries();
    const americas = await getAmericasCountries();
    const asia = await getAsianCountries();
    const oceania = await getOceaniasCountries();
    const world = await getWorldsCountries();

    for(let i=0; i<world.length;i++) {
        const dataToDb = {
            europe: europe[i],
            africa: africa[i],
            asia: asia[i],
            americas: americas[i],
            oceania: oceania[i],
            world: world[i]
        }
        await knex('nations').insert(dataToDb);
    }    
}

const convertToCountryNames = (continent: any[]) => {
    let countriesNames: any[] = [];

    continent.forEach(country => countriesNames.push(country.name.common));

    return countriesNames.sort();
}