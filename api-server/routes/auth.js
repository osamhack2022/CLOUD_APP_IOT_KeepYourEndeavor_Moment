const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
		//del 도 됩니다!
		const value = await redisCon.get('key');
		console.log(value);
		if (userInfo.pwd === recordedUserInfo.pwd) {
			const token = jwt.sign({
				id: userInfo.id,
				auth: rowUser[0].authority
			}, process.env.JWT_SECRET, {
				issuer: 'api-server'
			});
			
			res.status(200).json(
				{
					message : "로그인 성공! 토큰 발행",
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

module.exports = router;
