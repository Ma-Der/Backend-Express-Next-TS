const environment = process.environment.NODE_ENV || 'development';
const config = require('../db/knex')[environment];
module.exports = require('knex')(config);