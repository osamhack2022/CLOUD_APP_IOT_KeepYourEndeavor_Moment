const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const axios = require('axios');


let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

let redisLocalCon = "";
require('../db/redisLocalCon.js')().then((res) => redisLocalCon = res);

const { createHashedPassword, makePasswordHashed } = require('../lib/security.js');

router.post('/signup', async (req, res) => {
	const body = req.body;
  	try {
		const nowTime = moment().format("YYYY-M-D H:m:s");
		const authenticatedInfo = ['id','pwd','class','name','authority','position']
		const orgCandidates = Object.keys(body).filter(key => !authenticatedInfo.includes(key));
		
		let authenticatedBlanckFlag = false
		authenticatedInfo.forEach((key)=>{
			if (body[key] === "") {
				authenticatedBlanckFlag = true
			}
		});
		
		const organization = [];
		orgCandidates.forEach((key)=>{
			if (body[key] !== "") {
				organization.push(body[key]);
			}
		});

		if (organization.length === 0 || authenticatedBlanckFlag) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "회원 정보 중 누락된 부분이 있습니다."
			});
		}

		const blockInfo = {
			"id" : body.id,
			"organization" : organization.pop(),
			"password" : body.pwd
		}
		
		// 테스트용 원래는 api.jerrykang.com

		const peer_url = await axios.post("http://api.ky2chain.com/v1/peer", blockInfo);

		const { pwd, salt } = await createHashedPassword(body.pwd);
		const userInfo = [body.id, pwd, body.class, body.name, body.authority, body.position, salt,  peer_url.data.url, nowTime, nowTime];
		const affInfo = [null, body.id,body.cmd, body.cps ,body.division, body.br, body.bn, body.co, body.etc, nowTime, nowTime];
		
		await conn.execute('INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?,?)', userInfo);
		await conn.execute('INSERT INTO affiliation VALUES (?,?,?,?,?,?,?,?,?,?,?)', affInfo);
		
		return res.status(201).json(
			{
				message : "회원가입에 성공했습니다. 회원의 비밀번호는 암호화 처리됩니다.",
				issue : "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
				peer_url : `${peer_url.data.url}가 생성됐습니다.`,
			}
		);
	} catch (err) {
		console.error(err);
		return res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "올바르지 않은 회원 정보입니다."
			}
		);
	}
  
});

router.post('/signin', async (req, res) => {
	
	const body = req.body;
	try {
		const [userSelectResult, fieldUser] = await conn.execute('SELECT * FROM user WHERE id = ?', [body.id]);
		const recordedUserInfo = userSelectResult[0];
		const password = await makePasswordHashed(body.id, body.pwd);
		if (recordedUserInfo.pwd === password) {
			const token = jwt.sign({
				id: recordedUserInfo.id,
				auth: userSelectResult[0].authority,
				peer: userSelectResult[0].peer
			}, process.env.JWT_SECRET, {
				issuer: 'api-server'
			});

			const start_peer = await axios.post("http://api.ky2chain.com/v1/peer/start",{"id" : body.id});

			await redisLocalCon.set(recordedUserInfo.id, token);
			await redisLocalCon.expire(recordedUserInfo.id, 259200) // 로그인 유효 시간 6시간
			
			if (start_peer.data.status === undefined) {
				return res.status(408).json({
					error: "Requset time out",
					message : "peer 시작에 실패했습니다. 다시 로그인 해주세요."
				});
			}
			return res.status(200).json(
				{
					message : "로그인 성공! 토큰은 DB에 저장되어 관리됩니다. 로그인 유효시간은 6시간 입니다.",
					issue : "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
					token,
					start_result : `${start_peer.data.status}`
				}
			);	
			
		} else {
			return res.status(406).json(
				{
					error : "Not Acceptable",
					message : "비밀번호가 일치하지 않습니다."
				}
			);
		}
		
	} catch (err) {
		console.log(err);
		return res.status(406).json(
			{
				error : "Not Acceptable",
				message : "회원 가입되지 않은 회원입니다."
			}
		);
	}
	
});

router.post('/logout',verifyToken, async (req, res) => {
	const token = req.decoded;
	try {
		await redisLocalCon.del(token.id);
		return res.status(200).json({
			message : "로그아웃 되었습니다."
		});
	} catch (err) {
		console.log(err);
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."

		});
	}
});
module.exports = router;


