const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile'); 
const dotenv = require('dotenv');
dotenv.config();
// Adjust the path to your knexfile.js

// Initialize Knex
const knex = Knex({
    ...knexConfig,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });

// Bind Objection.js to the Knex instance
Model.knex(knex);

knex.raw('SELECT 1').then(()=>{
    console.log('Database connection established');
}).catch((err)=>{
    console.error(err);
});

module.exports = knex;
