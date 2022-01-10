import knex from '../db/db';


export class StackExchangeHandler {
    public static async getUsersFromEurope() {
        try {
            // const europeanCountries = await knex('nations').column('europe').whereNotNull('europe');
            // const usersFromEurope = await knex('users').whereNotNull('location').where("badge_count_bronze", ">", "200").orderBy('display_name', 'asc');
            // const users = europeanCountries.map(country => {
            //     return usersFromEurope.filter(user => (user.location).toLowerCase().includes((country.europe.toLowerCase())))
            // })

            const users = await knex('users')
                                .select('users.display_name', 'nations.europe')
                                .whereNotNull('location')
                                .where("badge_count_bronze", ">", "200")
                                .innerJoin('nations', 'location', 'nations.europe')
                                .orderBy('location', 'asc')
                                .orderBy('display_name', 'asc');

            return users;
        }
        catch (err) {
            console.log(err)
        }
    }

    public static async getCountryByUsersReputationBy() {
        try {
            const users = await knex
                                .select('users.reputation', 'nations.europe')
                                .from('users')
                                .whereNotNull('location')
                                .innerJoin('nations', function() {
                                    this.on('location', "=", "nations.europe")
                                })
                                .orderBy('location', 'asc')
                                .orderBy('reputation', 'desc')
                                .groupBy('reputation', 'nations.europe', 'location')
                                
            let temp: any = {};

            users.forEach(user => {
                if(temp.hasOwnProperty(user.europe)) {
                    temp[user.europe] = temp[user.europe] + user.reputation;
                } else {
                    temp[user.europe] = user.reputation;
                }
            })

            let sumUsers: any[] = [];

            for(const prop in temp) {
                sumUsers.push({europe: prop, reputation: temp[prop]})
            }
            const sortedSumUsers = sumUsers.sort((a, b) => {
                return b.reputation - a.reputation;
            })

            return sortedSumUsers;

        }
        catch(err) {
            console.log(err);
        }
    }

    public static async getBestUserForEachCountry() {
        try {
            const europeanCountries = await knex('nations').column('world').whereNotNull('world');
            const usersFromWorld = await knex('users').whereNotNull('location').orderBy('reputation', 'desc');
            const users = europeanCountries.map(country => {
                return usersFromWorld.filter(user => (user.location).toLowerCase().includes((country.world.toLowerCase())))
            })

            const repUsers = users.map(country => country[0]);
            const cleanRepUserArr = repUsers.flat().filter(user => user);

            return cleanRepUserArr;
        }
        catch(err) {
            console.log(err);
        }
    }
}