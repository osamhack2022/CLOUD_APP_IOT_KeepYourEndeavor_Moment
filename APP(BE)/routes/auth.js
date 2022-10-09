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

const { createHashedPassword, makePasswordHashed } = require('../lib/security.js');

/* GET home page. */
router.post('/signup', async (req, res, next) => {
	const user = req.body;
  try {
		const blockInfo = {
			"id" : user.id,
			"organization" : user.co,
			"password" : user.pwd
		}
		
		// 테스트용 원래는 api.jerrykang.com
		const peer_url = await axios.post("http://api.jerrykang.com/v1/peer", blockInfo);
		const start_peer = await axios.post("http://api.jerrykang.com/v1/peer/start", {"id" : user.id});
	
		console.log(peer_url.data.url);
		console.log(start_peer.data.status);
		
		const createAt = moment().format("YYYY-M-D H:m:s");
		const { pwd, salt } = await createHashedPassword(user.pwd);
		const userInfo = [user.id, pwd, user.class, user.name, user.authority, user.position, createAt, null, salt, peer_url.data.url];
		const affInfo = [null, user.id,user.cmd, user.cps ,user.division, user.br, user.bn, user.co, user.etc, createAt, null];
		await conn.execute('INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?,?)', userInfo);
		await conn.execute('INSERT INTO affiliation VALUES (?,?,?,?,?,?,?,?,?,?,?)', affInfo);
		
		res.status(200).json(
			{
				message : "회원가입에 성공했습니다. 회원의 비밀번호는 암호화 처리됩니다.",
				issue : "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
				start_url : `${peer_url.data.url} 가 생성됐습니다.`,
				start_result : `${start_peer.data.status}`
			}
		);
	} catch (err) {
		console.log(err);
		res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "잘못된 회원 정보입니다."
			}
		);
	}
  
});

router.post('/signin', async (req, res, next) => {
	const userInfo = req.body;
	try {
		const [rowUser, fieldUser] = await conn.execute('SELECT * FROM user WHERE id = ?', [userInfo.id]);
		const recordedUserInfo = rowUser[0];
		const password = await makePasswordHashed(userInfo.id, userInfo.pwd);
		if (recordedUserInfo.pwd === password) {
			const token = jwt.sign({
				id: recordedUserInfo.id,
				auth: rowUser[0].authority,
				peer: rowUser[0].peer
			}, process.env.JWT_SECRET, {
				issuer: 'api-server'
			});
			await redisCon.set(recordedUserInfo.id, token);
			await redisCon.expire(recordedUserInfo.id, 259200) // 로그인 유호 시간 6시간
			res.status(200).json(
				{
					message : "로그인 성공! 토큰은 DB에 저장되어 관리됩니다. 로그인 유효시간은 6시간 입니다.",
					issue : "암호화 시간이 조금 소요될 수 있으니 기다려주세요.",
					token
				}
			);	
			
		} else {
			res.status(406).json(
				{
					error : "Not Acceptable",
					message : "비밀번호가 일치하지 않습니다."
				}
			);
		}
		
	} catch (err) {
		console.log(err);
		res.status(406).json(
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
		await redisCon.del(token.id);
		res.status(200).json({
			message : "로그아웃 되었습니다."
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다. "

		});
	}
});
module.exports = router;


