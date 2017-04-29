'use strict';

const chalk = require('chalk');
const Sequelize = require('sequelize');
// const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

console.log(chalk.yellow('Opening connection to PostgreSQL'));

// create the database instance
const conn = new Sequelize(process.env.DATABASE_URL, {
	logging: false, // set to console.log to see the raw SQL queries
  	native: true // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = conn;
