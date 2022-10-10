const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const axios = require('axios');
let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);



router.post('/edit', verifyToken, async (req, res) => {
	try {
		const token = req.decoded;
		const userAllowKeys = ['pwd','class','name','authority','position'];
		const affAllowKeys = ['cmd','cps','division','br','bn','co','etc'];
		let updateUserTable = [];
		let updateAffTable = [];
		const clientRequestUpdateKey = Object.keys(req.body);
		clientRequestUpdateKey.forEach((key) => {
			if (userAllowKeys.includes(key)) {
				updateUserTable.push([key, req.body[key], token.id]);
			} else if (affAllowKeys.includes(key)) {
				updateAffTable.push([key, req.body[key], token.id]);
			} else {
				throw new Error("요청 데이터의 형식이 잘못됐습니다. 요청 JSON을 확인해주세요.");
			}
		});
		
		
		for await (let inform of updateUserTable) {
			const updateAt = moment().format("YYYY-M-D H:m:s"); //format("YYYY-M-D H:m:s");
			await conn.execute(`UPDATE user SET ${inform[0]} = '${inform[1]}' WHERE id = '${inform[2]}'`);
			await conn.execute(`UPDATE user SET updated_at = '${updateAt}' WHERE id = '${inform[2]}'`);
		}
		for await (let inform of updateAffTable) {
			const updateAt =moment().format("YYYY-M-D H:m:s");
			await conn.execute(`UPDATE affiliation SET ${inform[0]} = '${inform[1]}' WHERE user_id = '${inform[2]}'`);
			await conn.execute(`UPDATE affiliation SET updated_at = '${updateAt}' WHERE id = '${inform[2]}'`);
		}
		
		
		
		res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		return res.status(406).json({
			error : "Not Acceptable", 
			message: err.message
		});
	}
});

router.post('/delete', verifyToken, async (req, res) => {
	try {
		const token = req.decoded;
		await axios.delete(`${token.peer}/v1/peer/${token.id}`);
		await conn.execute(`DELETE FROM user WHERE id = '${token.id}'`);
		await conn.execute(`DELETE FROM application WHERE rep_id = '${token.id}'`);
		await conn.execute(`DELETE FROM issue WHERE issuer_id = '${token.id}'`);
		await conn.execute(`DELETE FROM notice WHERE author_id = '${token.id}'`);
		await redisCon.del(token.id);
		res.status(200).json({
			message: '회원 탈퇴가 완료됐습니다. 로그아웃합니다.'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Internal Server Error",
			message: err.message
		})
	}
});
module.exports = router;


