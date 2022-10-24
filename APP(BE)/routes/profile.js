const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const axios = require('axios');
let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

let redisLocalCon = "";
require('../db/redisLocalCon.js')().then((res) => redisLocalCon = res);



router.get('/', verifyToken, async(req, res) => {
	try {
		const selectResult = await conn.execute('SELECT user.id as user_id, user.class as class, user.name as user_name, user.position as position, affiliation.cmd as cmd, affiliation.cps as cps, affiliation.division as division, affiliation.br as br, affiliation.bn as bn, affiliation.co as co, affiliation.etc as etc FROM user INNER JOIN affiliation ON user.id=affiliation.user_id');
		return res.status(200).json({
			message: '요청한 회원 정보들을 보내드립니다.',
			userInfo : selectResult[0]
		});
	} catch (err) {
		console.error(err);
		return res.status(506).json({
			error: "DATABASE ERROR / Variant Also Negotiates",
			message : "DB query 도중 문제가 발생했습니다."
		});
	}
});

router.get('/:userId', verifyToken, async (req, res) => {
	try {
		const findedUserId = req.params.userId;
		const selectResult = await conn.execute('SELECT user.id as user_id, user.class as class, user.name as user_name, user.position as position, affiliation.cmd as cmd, affiliation.cps as cps, affiliation.division as division, affiliation.br as br, affiliation.bn as bn, affiliation.co as co, affiliation.etc as etc FROM user INNER JOIN affiliation ON user.id=affiliation.user_id WHERE affiliation.user_id = ?'
																					 ,[findedUserId])
		if (selectResult[0].length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "회원이 존재하지 않습니다."
			});
		}
		return res.status(200).json({
			message: '요청한 회원 정보를 보내드립니다.',
			userInfo : selectResult[0][0]
		});
	} catch (err) {
		console.error(err);
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."
		});
	}
});

router.post('/edit', verifyToken, async (req, res) => {
	try {
		const token = req.decoded;
		const body = req.body;
		const nowTime = moment().format("YYYY-M-D H:m:s");

		const userAllowKeys = ['pwd','class','name','authority','position', 'grade_target_id'];
		const affAllowKeys = ['cmd','cps','division','br','bn','co','etc'];
		const updateUserTable = [];
		const updateAffTable = [];
		let auth_flag = false;

		const clientRequestUpdateKey = Object.keys(body);
		clientRequestUpdateKey.forEach((key) => {
			if (body[key] === "") {
				console.log();
			} else if (key === "authority" && body[key] !== "") {
				if (token.auth !== "개설자") {
					auth_flag = true;
				} else {
					updateUserTable.push([key, body[key], body["grade_target_id"]]);
				}
			} else if (userAllowKeys.includes(key)) {
			
				updateUserTable.push([key, body[key], token.id]);
			} else if (affAllowKeys.includes(key)) {
				updateAffTable.push([key, body[key], token.id]);
			} else {
				throw new Error("요청 데이터의 형식이 잘못됐습니다. 요청 JSON을 확인해주세요.");
			}
		});
		
		if (auth_flag) {
			return res.status(403).json({
				error : "Not Acceptable", 
				message: "개설자만이 권한을 부여할 수 있습니다."
			});
		}
		
		for await (let inform of updateUserTable) {
			await conn.execute(`UPDATE user SET ${inform[0]} = '${inform[1]}' WHERE id = '${inform[2]}'`);
			await conn.execute(`UPDATE user SET updated_at = '${nowTime}' WHERE id = '${inform[2]}'`);
		}
		for await (let inform of updateAffTable) {
			await conn.execute(`UPDATE affiliation SET ${inform[0]} = '${inform[1]}' WHERE user_id = '${inform[2]}'`);
			await conn.execute(`UPDATE affiliation SET updated_at = '${nowTime}' WHERE id = '${inform[2]}'`);
		}
	
		return res.status(201).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		console.error(err);
		return res.status(406).json({
			error : "Not Acceptable", 
			message: err.message
		});
	}
});

router.delete('/', verifyToken,async (req, res) => {
	try {
		const token = req.decoded;
		
		//await axios.delete(`${token.peer}/v1/peer/${token.id}`);
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
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."
		});
	}
});
module.exports = router;


