const express = require('express');
const router = express.Router();
const {verifyToken, normalAccess} = require('../middleware/accessController.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);



/* GET home page. */ 
router.get('/', verifyToken ,normalAccess, async (req, res, next) => {
	
	const peer = req.decoded.peer;
  try {
		//const response = await axios.get(`${peer}/v1/block?user=${req.decoded.id}`); 실제론 여기
		const response = await axios.get(`http://api.jerrykang.com/v1/block?user=${req.decoded.id}`); // 테스트는 여기
		console.log(response.data.blocks);
		const usersData = []
		response.data.blocks.forEach((data) =>{			
			data.data["generated_time"] = data.header.generated_time
			usersData.push(data.data);
		});
		
		console.log(usersData);
		
		
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