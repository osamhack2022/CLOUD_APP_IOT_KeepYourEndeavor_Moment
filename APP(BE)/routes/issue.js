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
		console.log(moment(rowUser[0].created_at).format("YYYY-M-D H:m:s"));
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
		if (standard._fieldsProto === undefined) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "이슈는 살아있으나 기준이 삭제된 이슈입니다. 1. 해당 이슈를 삭제 후 재생성 해주세요 2. 기준을 재생성 해주세요"
			});
		}

		const conversionStandard = {}
		Object.keys(standard._fieldsProto).forEach((key) => {
			conversionStandard[key] = standard._fieldsProto[key]["stringValue"]
		});
		
		res.status(200).json({
			message : "등록된 issue를 성공적으로 전송했습니다.",
			issue : rowUser,
			standard : conversionStandard
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
		const createAt = moment().add(9,'h').format("YYYY-M-D H:m:s");
		const updateAt = moment().add(9,'h').format("YYYY-M-D H:m:s");
		const id = await makeHashedValue(createAt);
		console.log(id);
		const issueInfo = req.body;
		const bind = [id, issueInfo.type, issueInfo.subject, token.id, issueInfo.mandatory, createAt, updateAt];
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
			// 스탠다드 생성하기
			await fireDB.collection(issueInfo.type).doc(issueInfo.subject).set(issueInfo.standard);
			resultOfStandard = `요청하신 내용대로 기준을 생성했습니다.`
		} else {
			resultOfStandard = `기준은 이미 생성돼 있습니다. 수정을 원할 시 standard route에서 삭제 후 생성해주세요`;
			flag = true;
		}
		
		await conn.execute('INSERT INTO issue VALUES (?,?,?,?,?,?,?)', bind);
		res.status(200).json(
			{
				message : "issue 등록이 완료됐습니다.",
				issueId : id,
				resultOfStandard,
				mandatory : issueInfo.mandatory
			}
		);
	} catch (err) {
		console.error(err);
		res.status(406).json(
			{
				error : "Not Acceptable", 
				message: "이미 등록된 이슈이거나 잘못된 이슈입니다. 1. 이슈를 새로 등록을 원하실 경우 기존 이슈를 삭제해 주세요. 2. 기준을 새로 생성하시려면 기준을 삭제 후 standard route에서 생성해주세요"
			}
		);
	}
});


router.delete('/:issueId/', verifyToken, supervisorAccess, async (req, res) => {
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


