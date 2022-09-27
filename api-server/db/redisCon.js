const express = require('express');
const dotenv = require('dotenv');
const { createClient } = require('redis');
 
module.exports = async () => {
	dotenv.config(); // env환경변수 파일 가져오기
	//* Redis 연결
	// redis[s]://[[username][:password]@][host][:port][/db-number]
	const client = createClient({
		 url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`
	});
	client.on('connect', () => {
		 console.info('Redis connected!');
	});
	client.on('error', (err) => {
		 console.error('Redis Client Error', err);
	});
	await client.connect();
	
	return client
}







