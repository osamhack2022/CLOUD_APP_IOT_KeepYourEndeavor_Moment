const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken, normalAccess, supervisorAccess} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);

router.get('/', verifyToken, normalAccess, async (req, res) => {
	
});

router.post('/regist', verifyToken, supervisorAccess, async (req, res) => {
	
	
	res.send("hello");
});

module.exports = router;


