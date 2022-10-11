const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {verifyToken, normalAccess,managerAccess, supervisorAccess} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { makeHashedValue } = require('../lib/security.js');


let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const fireDB = require('../db/firestoreCon.js');

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
		
		const [rowUser, fieldUser] = await conn.execute('SELECT * FROM issue WHERE id = ?', [issueId]);
		const issue = rowUser[0];
		const standard = await fireDB.collection(issue.type).doc(issue.subject).get();
		
		console.log();
		res.status(200).json({
			message : "등록된 issue를 성공적으로 전송했습니다.",
			issue : rowUser,
			standard : standard._fieldsProto
		});
	} catch (err) {
		console.error(err);
		res.status(406).json({
			error : "Not Acceptable", 
			message: "잘못된 이슈 정보입니다."
		});
	}
});

router.post('/regist', verifyToken, managerAccess, async (req, res) => {
	try {
		const token = req.decoded;
		const createAt = moment().format("YYYY-M-D H:m:s");
		const updateAt = moment().format("YYYY-M-D H:m:s");
		const id = await makeHashedValue(createAt);
		console.log(id);
		const issueInfo = req.body;
		const bind = [id, issueInfo.type, issueInfo.subject, token.id, createAt, updateAt];
		if (issueInfo.type === undefined || issueInfo.subject === undefined) {
			throw new Error();
		}
		
		
		let flag = true
		let resultOfStandard = ""
		const userRef = await fireDB.collection(issueInfo.type).doc(issueInfo.subject).get();
		if (!userRef._fieldsProto) {
			await conn.execute('INSERT INTO type VALUES (?,?,?)', [issueInfo.type, createAt, updateAt]);
		} else {
			flag = false;
		}
		if (flag) {
			resultOfStandard = `collection = ${issueInfo.type}, subject = ${issueInfo.subject}(으)로 기준을 생성해야 합니다.`;
		} else {
			resultOfStandard = `기준은 이미 생성돼 있습니다.`;
			flag = true;
		}
		
		await conn.execute('INSERT INTO issue VALUES (?,?,?,?,?,?)', bind);
		res.status(200).json(
			{
				message : "issue 등록이 완료됐습니다.",
				issueId : id,
				resultOfStandard
			}
		);
	} catch (err) {
		console.error(err);
		res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "잘못된 이슈 정보입니다."
			}
		);
	}
});


/* issue의 삭제는 의미가 없어보인다. 고로 과감히 삭제 
router.post('/:issueId/edit', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const issueId = req.params.issueId;
		const issueAllowKeys = ['type','subject'];
		let updateIssueTable = [];
		
		const [rowUser, fieldUser] = await conn.execute('SELECT * FROM issue WHERE id = ?', [issueId]);
		const issue = rowUser[0];
		console.log(issue);
		
		
		const clientRequestUpdateKey = Object.keys(req.body);
		clientRequestUpdateKey.forEach((key) => {
			if (key === "standard") {
				console.log();
			} else if (issueAllowKeys.includes(key)) {
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
		
		if (req.body.standard) {
			const updateStandard = JSON.parse(req.body.standard);
			console.log(updateStandard);
			const userRef = await fireDB.collection(issue.type).doc(issue.subject).get();
			console.log(userRef._fieldsProto);
			if (userRef._fieldsProto) {
				await fireDB.collection(issue.type).doc(issue.subject).update(updateStandard);
			} else {
				return res.status(406).json(
								{
									error : "Not Acceptable", 
									message: "잘못된 기준 정보이거나 없는 기준입니다. issue 생성시 기준도 같이 생성해주세요"
								}
							);
			}
		}
		
		res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: "예기치 못한 에러가 발생했습니다."
		})
	}
});
*/

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
			message: "예기치 못한 에러가 발생했습니다."
		})
	}
});


module.exports = router;


