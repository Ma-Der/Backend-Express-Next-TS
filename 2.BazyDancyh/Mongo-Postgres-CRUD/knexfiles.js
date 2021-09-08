module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/CRUD',
        migrations: {
            directory: __dirname + '/src/PostgreDB/db/migrations',
        },
        seeds: {
            directory: __dirname + '/src/PostgreDB/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/src/PostgreDB/db/migrations',
        },
        seeds: {
            directory: __dirname + '/src/PostgreDB/db/seeds/production',
        },
    }
};