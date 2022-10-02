const express = require('express');
const router = express.Router();
const {verifyToken, normalAccess,managerAccess, supervisorAccess} = require('../middleware/accessController.js');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { makeHashedValue } = require('../lib/security.js');
const { timeChecker } = require('../lib/func.js'); 

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);



router.get('/', verifyToken, normalAccess, async(req, res) => {
	try {
		const [rowNotice, fieldUser] = await conn.execute('SELECT * FROM issue');
		res.status(200).json({
			message : "등록된 notice들을 성공적으로 전송했습니다.",
			notices : rowNotice
		});
	} catch (err) {
		res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});

router.post('/regist', verifyToken ,managerAccess, async (req, res, next) => {
	try {
		const token = req.decoded;
		let {title, issue_id, test_date, apply_date, description} = req.body;
		timeChecker(test_date, apply_date, res);
		
		const id = await makeHashedValue(title); 
		const bind = [id, title, issue_id, token.id, test_date, apply_date, moment().format("YYYY-M-D H:m:s"), null, description];
		await conn.execute('INSERT INTO notice VALUES (?,?,?,?,?,?,?,?,?)', bind);
		return res.status(200).json({
			message:"공지를 성공적으로 등록했습니다."
		});
		
		
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}

});

router.get('/:noticeId', verifyToken ,managerAccess, async (req, res, next) => {
	try {
		const noticeId = req.params.noticeId;
		const [rowNotice, fieldNotice] = await conn.execute('SELECT * FROM notice WHERE id = ?', [noticeId]);
		if (rowNotice.length === 0) {
			return res.status(406).json({
			error : "Not Acceptable", 
			message: "올바르지 않은 공지 넘버 입니다."
		});
		}
		console.log(rowNotice);
		res.status(200).json({
			message : "notice를 성공적으로 전송했습니다.",
			notice : rowNotice
		});
	} catch (err) {
		res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});

router.post('/:noticeId/edit', verifyToken ,managerAccess, async (req, res, next) => {
	try {
		const noticeId = req.params.noticeId;
		const noticeAllowKeys = ['title','issue_id','test_date','apply_date','description'];
		let updateNoticeTable = [];

		const clientRequestUpdateKey = Object.keys(req.body);
		clientRequestUpdateKey.forEach((key) => {
			if (noticeAllowKeys.includes(key)) {
				updateNoticeTable.push([key, req.body[key], noticeId]);
			} else {
				throw new Error('Client request key is not matched to the db column name.');
			}
		});
		timeChecker(req.body.test_date, req.body.apply_date, res);
		
		for await (let inform of updateNoticeTable) {
			const updateAt = moment().format("YYYY-M-D H:m:s"); //format("YYYY-M-D H:m:s");
			await conn.execute(`UPDATE notice SET ${inform[0]} = '${inform[1]}' WHERE id = '${inform[2]}'`);
			await conn.execute(`UPDATE notice SET updated_at = '${updateAt}' WHERE id = '${inform[2]}'`);
		}
		
		
		
		res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Internal Server Error",
			message: err.message
		})
	}
});

router.post('/:noticeId/delete', verifyToken ,managerAccess, async (req, res, next) => {
	try {
		const noticeId = req.params.noticeId;
		const deleteResult = await conn.execute(`DELETE FROM notice WHERE id = '${noticeId}'`);
		if (deleteResult[0].affectedRows === 0) {
				res.status(406).json({
				error: "Not Acceptable",
				message: "존재하지 않는 공지 넘버입니다."
			});
		} else {
			res.status(200).json({
				message: '공지 삭제가 완료됐습니다.'
			});	
		}
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: err.message
		})
	}
});
module.exports = router;
