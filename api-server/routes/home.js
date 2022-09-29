const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);

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
			message: '공지 사항들을 응답했습니다',
			user,
			notices
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Internal Server Error",
			message : "공지사항을 가져올 수 없습니다."
		});
	}
	
});

router.get('/notice/:noticeId', verifyToken, async (req, res, next) => {
	try {
		const userToken = req.decoded;
		const [user, fieldsUser] = await conn.execute('SELECT id, class, name, authority, position FROM user WHERE id = ?', [userToken.id]);
		
		const noticeId = parseInt(req.params.noticeId, 10);
		console.log(noticeId)
		const [notice, fields] = await conn.execute('SELECT * FROM notice WHERE id = ?', [noticeId]);
		
		if (notice.length === 0) {
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
		const noticeId = parseInt(req.params.noticeId,10);
		const applicants = JSON.stringify(JSON.parse(req.body.applicant).users);
		const rep_applicant = JSON.parse(req.body.rep_applicant)
		const message = req.body.message;
		const group = [null,noticeId ,rep_applicant.id, applicants, message,null,null];

		await conn.execute('INSERT INTO representative_application VALUES (?,?,?,?,?,?,?)', group);
		
		res.status(200).json({
			message:`${rep_applicant} 회원 정보로 대표 신청 성공`,
			noticeId
		});
		
	} catch (err) {
		console.log(err);
		res.status(406).json({
			error: "Not Acceptable",
			message: "회원가입 되지 않은 회원은 시험에 응시할 수 없습니다. 신청 회원 정보를 확인하세요"
		});
	}
});

module.exports = router;
