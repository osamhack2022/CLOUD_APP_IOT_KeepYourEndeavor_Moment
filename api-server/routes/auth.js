const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middleware/verifyToken.js');
let conn = "";
require('../db/sqlCon.js')()
.then((res) => {
	conn = res
});
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);



/* GET home page. */
router.post('/signup', async (req, res, next) => {
	const user = req.body;
  try {
		const userInfo = [user.id, user.pwd, user.class, user.name, user.authority, user.position, null, null];
		const affInfo = [null, user.id, user.div, user.br, user.bn, user.co, user.etc, null, null];
		
		await conn.execute('INSERT INTO user VALUES (?,?,?,?,?,?,?,?)', userInfo);
		await conn.execute('INSERT INTO affiliation VALUES (?,?,?,?,?,?,?,?,?)', affInfo);
		
		res.status(200).json(
			{
				message : "회원가입에 성공했습니다."
			}
		);
	} catch (err) {
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
		if (userInfo.pwd === recordedUserInfo.pwd) {
			const token = jwt.sign({
				id: userInfo.id,
				auth: rowUser[0].authority
			}, process.env.JWT_SECRET, {
				issuer: 'api-server'
			});
			await redisCon.set(userInfo.id, token);
			await redisCon.expire(userInfo.id, 259200) // 로그인 유호 시간 6시간
			res.status(200).json(
				{
					message : "로그인 성공! 토큰은 DB에 저장되어 관리됩니다. 로그인 유효시간은 6시간 입니다.",
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
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});
module.exports = router;

