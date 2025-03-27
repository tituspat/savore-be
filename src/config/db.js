const dotenv = require('dotenv');
const knex = require('knex');

dotenv.config();

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
});

module.exports = db;