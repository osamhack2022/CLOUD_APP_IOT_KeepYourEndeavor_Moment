const express = require('express');
const router = express.Router();
const {verifyToken,managerAccess } = require('../middleware/accessController.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);

router.post('/push', verifyToken ,managerAccess, async (req, res, next) => {
	const peer = 'peer1';
  try {
		const {user, result, issue_id} = req.body;
		const [issue, fieldsUser] = await conn.execute('SELECT * FROM issue WHERE id = ?', [issue_id]);
		if (issue.length === 0) {
			return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '등록되지 않은 issue에 대한 온체인 요청입니다.'
				}
			);
		}
		const userRecord = {
			data : [{
				user,
				result,
				issue_id
			}]
		}
		
		const response = await axios.post(`http://${peer}.jerrykang.com/v1/block`, userRecord);

		res.status(200).json(
			{
				message : `${peer}에 해당 데이터를 온체인 시켰습니다.`
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
