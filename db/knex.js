// Get the current environment. If NODE_ENV is not set, assume we're in development
const environment = process.env.NODE_ENV || 'development';

// Get the knex confirguration exported from the knexfile.js
const knexConfig = require ('../knexfile');

// Get the confirguration for the current environment
const config = knexConfig[environment];

// Get the knex module
const knex = require('knex');

// Connect to the database with the confirguration for the current environment
const knexConnection = knex(config);

// Export the database connection to be used thorughout our appliation
module.exports = knexConnection;
