const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken,normalAccess } = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');


let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);

const { createHashedPassword, makePasswordHashed } = require('../lib/security.js');

router.get('/',verifyToken,normalAccess, async (req, res, next) => {
	try {
		
		const [members, fields] = await conn.execute('SELECT rep_id, members, message FROM application');
		res.status(200).json({
			message: "현재 신청내역에 있는 모든 인원 현황입니다",
			members
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});


router.get('/:noticeId/',verifyToken,normalAccess, async (req, res, next) => {
	try {
		const noticeId = req.params.noticeId;
		let issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [noticeId]);
		issueId = issueId[0][0].issue_id;
		const [members, fields] = await conn.execute('SELECT rep_id, members, message FROM application WHERE issue_id = ?', [issueId]);
		res.status(200).json({
			message: "해당 공지에 신청한 인원 현황입니다",
			members
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다. "
		});
	}
});

router.post('/:noticeId/regist',verifyToken,normalAccess, async (req, res, next) => {
	try {
		const token = req.decoded;
		const noticeId = req.params.noticeId;
		let issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [noticeId]);
		issueId = issueId[0][0].issue_id;
		if (issueId[0].length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "잘못된 공지 정보입니다."
			});
		}
		
		const members = JSON.parse(req.body.members).members;
		const message = req.body.message;
		const createAt = moment().format("YYYY-M-D H:m:s");
		
		const bind = [null, issueId, token.id, members, message, createAt, null]
		await conn.execute('INSERT INTO application VALUES (?,?,?,?,?,?,?)', bind);
		
		res.status(200).json({
			message: "해당 공지에 신청을 완료했습니다."
		});
	
	} catch (err) {
		
		return res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다. "
		});
	}
	
});
router.post('/:noticeId/edit',verifyToken,normalAccess, async (req, res, next) => {
	try {
		const rep_id = req.decoded.id
		const noticeId = req.params.noticeId;
		let issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [noticeId]);
		
		if (issueId[0].length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "잘못된 공지 정보입니다."
			});
		}
		
		issueId = issueId[0][0].issue_id;
		const members = JSON.parse(req.body.members).members
		
		const [repResult, fields] = await conn.execute('SELECT * FROM application WHERE rep_id = ?',[rep_id]);
	
		if (repResult.length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "대표 신청자 아이디로 로그인 해주십시오."
			});
		}
		const applicationAllowKeys = ['members','message'];
		let updateApplicationTable = [];

		const clientRequestUpdateKey = Object.keys(req.body);
		clientRequestUpdateKey.forEach((key) => {
			if (applicationAllowKeys.includes(key)) {
				updateApplicationTable.push([key, req.body[key], issueId, rep_id]);
			} else {
				throw new Error('Client request key is not matched to the db column name.');
			}
		});
		
		
		for await (let inform of updateApplicationTable) {
			const updateAt = moment().format("YYYY-M-D H:m:s"); //format("YYYY-M-D H:m:s");
			await conn.execute(`UPDATE application SET ${inform[0]} = '${inform[1]}' WHERE issue_id = '${inform[2]}' AND rep_id = '${inform[3]}'`);
			await conn.execute(`UPDATE application SET updated_at = '${updateAt}' WHERE issue_id = '${inform[2]}' AND rep_id = '${inform[3]}'`);
		}

		res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			
			error: "Internal Server Error",
			message: "예기치 못한 에러가 발생했습니다. "
		})
	}
});

router.post('/:noticeId/delete',verifyToken,normalAccess, async (req, res, next) => {
	try {
		const rep_id = req.decoded.id
		const noticeId = req.params.noticeId;
		let issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [noticeId]);
		console.log(issueId);
		issueId = issueId[0][0].issue_id;
		const result = await conn.execute('DELETE FROM application WHERE rep_id = ? AND issue_id = ?', [rep_id, issueId]);
		if (result[0].affectedRows === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "공지번호와 대표신청자의 정보가 연관성이 있는지 확인하세요."
			});
		}
		res.status(200).json({
			message: "대표신청자가 공지에 신청한 내역을 모두 삭제했습니다."
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다. "
		});
	}
});
module.exports = router;



