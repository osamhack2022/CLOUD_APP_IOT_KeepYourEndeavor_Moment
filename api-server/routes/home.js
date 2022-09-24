const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');
let conn = "";
require('../db/sqlCon.js')()
.then((res) => {
	conn = res
});

/* GET home page. */ 
router.get('/', verifyToken , async (req, res, next) => {
	console.log(req.query);
  try {
		// request to the blockchain server
		throw new Error("not yet build blockchain api");
	} catch (err) {
		res.status(406).json(
			{
				error:'Not Acceptable', 
				message : '사용자 블록체인이 등록되어 있지 않습니다.'
			}
		);
	}
});

router.get('/notice', verifyToken, async (req, res, next) => {
	try {
		const userToken = req.decoded;
		const [notices, fields] = await conn.execute('SELECT * FROM notice');
		const [user, fieldsUser] = await conn.execute('SELECT id, class, name, authority, position FROM user WHERE id = ?', [userToken.id]);
		res.status(200).json({
			user,
			notices
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error"
		})
	}
	
});

router.get('/notice/:noticeId', verifyToken, async (req, res, next) => {
	try {
		const userToken = req.decoded;
		const [user, fieldsUser] = await conn.execute('SELECT id, class, name, authority, position FROM user WHERE id = ?', [userToken.id]);

		const noticeId = parseInt(req.params.noticeId.slice(1), 10);
		const [notice, fields] = await conn.execute('SELECT * FROM notice WHERE id = ?', [noticeId]);
		
		if (notice) {
			throw new Error("존재하지 않는 Notice ID");
		}
		
		res.status(200).json({
			user,
			notice
		});
	} catch (err) {
		console.log(err);
		res.status(406).json({
			error:'Not Acceptable', 
			message : '존재하지 않는 Notice Id 입니다.'
		});
	}
});

router.post('/notice/:noticeId', verifyToken, async (req, res, next) => {
	try {
		console.log(req.body);
		
		res.json({
			message:"success"
		});
		
	} catch (err) {
		
	}
});

module.exports = router;
