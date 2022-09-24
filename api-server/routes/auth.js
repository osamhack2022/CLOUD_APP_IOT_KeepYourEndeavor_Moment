const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
let conn = "";
require('../db/sqlCon.js')()
.then((res) => {
	conn = res
});


/* GET home page. */
router.post('/signup', async (req, res, next) => {
	const user = req.body;
  try {
		const [rowUser, fieldUser] = await conn.execute('INSERT INTO user VALUES (?,?,?,?,?,?,?,?)', [user.id, user.pwd, user.class, user.name, user.authority, user.position, null, null]);
		const [rowAff, fieldAff] = await conn.execute('INSERT INTO affiliation VALUES (?,?,?,?,?,?,?,?,?)', [null, user.id, user.div, user.br, user.bn, user.co, user.etc, null, null]);
		res.status(200).json(
			{
				message : "회원가입에 성공했습니다."
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
	console.log(userInfo);
	try {
		const [rowUser, fieldUser] = await conn.execute('SELECT * FROM user WHERE id = ?', [userInfo.id]);
		if (userInfo.pwd === rowUser[0].pwd) {
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
		console.error(err);
		res.status(406).json(
				{
					error : "Not Acceptable",
					message : "회원 가입되지 않은 회원입니다."
				}
			);
	}
});

module.exports = router;
