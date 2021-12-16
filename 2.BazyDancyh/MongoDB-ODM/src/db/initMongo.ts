const MongoClient = require('mongodb').MongoClient;

export const client = new MongoClient("mongodb://localhost:27017/Users");