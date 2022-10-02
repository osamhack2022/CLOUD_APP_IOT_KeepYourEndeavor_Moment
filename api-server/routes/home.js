const express = require('express');
const router = express.Router();
const {verifyToken, normalAccess} = require('../middleware/accessController.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);



/* GET home page. */ 
router.get('/', verifyToken ,normalAccess, async (req, res, next) => {
	const peer = 'peer1';
  try {
		
		const response = await axios.get(`http://${peer}.jerrykang.com/v1/block`);
		const usersData = []
		response.data.blocks.rows.forEach((data) => {
			usersData.push(data.data[0]);
		});
		
		res.status(200).json(
			{
				message : `${peer} 원장을 가져왔습니다.`,
				usersData
			}
		);
	} catch (err) {
		console.error(err);
		res.status(406).json(
			{
				error:'Not Acceptable', 
				message : `${peer} 원장이 존재하지 않습니다.`
			}
		);
	}
});



module.exports = router;
