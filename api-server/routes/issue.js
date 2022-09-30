const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken, normalAccess,managerAccess, supervisorAccess} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { makeHashedValue } = require('../lib/security.js');


let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);

router.get('/', verifyToken, managerAccess, async (req, res) => {
	try {
		const [rowUser, fieldUser] = await conn.execute('SELECT * FROM issue');
		res.status(200).json({
			message : "등록된 issue들을 성공적으로 전송했습니다.",
			issues : rowUser
		});
	} catch (err) {
		res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});

router.get('/:issueId', verifyToken, managerAccess, async (req, res) => {
	try {
		const issueId = req.params.issueId;
		console.log(issueId);
		const [rowUser, fieldUser] = await conn.execute('SELECT * FROM issue WHERE id = ?', [issueId]);
		res.status(200).json({
			message : "등록된 issue를 성공적으로 전송했습니다.",
			issue : rowUser
		});
	} catch (err) {
		res.status(406).json({
			error : "Not Acceptable", 
			message: "잘못된 이슈 정보입니다."
		});
	}
});

router.post('/regist', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const token = req.decoded;
		const createAt = moment().format("YYYY-M-D H:m:s");
		const id = await makeHashedValue(createAt);
		const issueInfo = req.body;
		const bind = [id, issueInfo.type, issueInfo.subject, token.id, createAt, null];
		await conn.execute('INSERT INTO issue VALUES (?,?,?,?,?,?)', bind);
		res.status(200).json(
			{
				message : "issue 등록이 완료됐습니다.",
				issueId : id
			}
		);
	} catch (err) {
		res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "잘못된 이슈 정보입니다."
			}
		);
	}
});

router.post('/:issueId/edit', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const issueId = req.params.issueId;
		const issueAllowKeys = ['type','subject'];
		let updateIssueTable = [];

		const clientRequestUpdateKey = Object.keys(req.body);
		clientRequestUpdateKey.forEach((key) => {
			if (issueAllowKeys.includes(key)) {
				updateIssueTable.push([key, req.body[key], issueId]);
			} else {
				throw new Error('Client request key is not matched to the db column name.');
			}
		});
		
		
		for await (let inform of updateIssueTable) {
			const updateAt = moment().format("YYYY-M-D H:m:s"); //format("YYYY-M-D H:m:s");
			await conn.execute(`UPDATE issue SET ${inform[0]} = '${inform[1]}' WHERE id = '${inform[2]}'`);
			await conn.execute(`UPDATE issue SET updated_at = '${updateAt}' WHERE id = '${inform[2]}'`);
		}
		
		
		
		res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: err.message
		})
	}
});

router.post('/:issueId/delete', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const issueId = req.params.issueId;
		const deleteResult = await conn.execute(`DELETE FROM issue WHERE id = '${issueId}'`);
		if (deleteResult[0].affectedRows === 0) {
				res.status(406).json({
				error: "Not Acceptable",
				message: "존재하지 않는 이슈 넘버입니다."
			});
		} else {
			res.status(200).json({
				message: '이슈 삭제가 완료됐습니다.'
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


