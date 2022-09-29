const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/verifyToken.js');
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
				throw new Error('Client request key is not matched to the db column name.');
			}
		});
		
		for await (let inform of updateUserTable) {
			await conn.execute(`UPDATE user SET ${inform[0]} = '${inform[1]}' WHERE id = '${inform[2]}'`);
		}
		for await (let inform of updateAffTable) {
			await conn.execute(`UPDATE affiliation SET ${inform[0]} = '${inform[1]}' WHERE user_id = '${inform[2]}'`);
		}
		
		res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: err.message
		})
	}
});

router.post('/delete', verifyToken, async (req, res) => {
	try {
		const token = req.decoded;
		await conn.execute(`DELETE FROM user WHERE id = '${token.id}'`);
		await redisCon.del(token.id);
		res.status(200).json({
			message: '회원 탈퇴가 완료됐습니다. 로그아웃합니다.'
		});
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: err.message
		})
	}
});
module.exports = router;


