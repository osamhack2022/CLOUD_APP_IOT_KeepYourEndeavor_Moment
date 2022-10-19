module.exports = async () => {
	// get the client
require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');
// create the connection, specify bluebird as Promise
const connection = await mysql.createConnection(
	{
		host: process.env.HOST, 
		user: process.env.DBUSER, 
		password: process.env.PASSWORD,
		database: process.env.DATABASE, 
		Promise: bluebird
	});

return connection
}