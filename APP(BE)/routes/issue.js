const express = require('express');
const router = express.Router();
const {verifyToken, managerAccess, supervisorAccess} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { makeHashedValue } = require('../lib/security.js');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const fireDB = require('../db/firestoreCon.js');

const convertStandard = async (standard) => {
	const conversionStandard = {}
	Object.keys(standard).forEach((key) => {
		conversionStandard[key] = standard[key]["stringValue"]
	});
	return conversionStandard
};


router.get('/', verifyToken, managerAccess, async (req, res) => {
	try {
		const [issueSelectResult, fieldUser] = await conn.execute('SELECT * FROM issue');
		res.status(200).json({
			message : "등록된 issue들을 성공적으로 전송했습니다.",
			issues : issueSelectResult
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
		const params = req.params;
		
		const [issueSelectResult, fieldUser] = await conn.execute('SELECT * FROM issue WHERE id = ?', [params.issueId]);
		const standard = await fireDB.collection(issueSelectResult[0].type).doc(issueSelectResult[0].subject).get();
		if (standard._fieldsProto === undefined) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "이슈는 살아있으나 기준이 삭제된 이슈입니다. 1. 해당 이슈를 삭제 후 재생성 해주세요 2. 기준을 재생성 해주세요"
			});
		}

		/* const conversionStandard = {}
		Object.keys(standard._fieldsProto).forEach((key) => {
			conversionStandard[key] = standard._fieldsProto[key]["stringValue"]
		});*/
		
		return res.status(200).json({
			message : "등록된 issue를 성공적으로 전송했습니다.",
			issue : issueSelectResult,
			standard : convertStandard(standard._fieldsProto)
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
		const nowTime = moment().add(9,'h').format("YYYY-M-D H:m:s");
		const token = req.decoded;
		const id = await makeHashedValue(nowTime);
		const body = req.body;

		if (body.type === undefined || body.subject === undefined) {
			throw new Error();
		}

		const bind = [id, body.type, body.subject, token.id, body.mandatory, nowTime, nowTime];
		
		let flag = true
		let resultOfStandard = ""
		
		const DBstandard = await fireDB.collection(body.type).doc(body.subject).get();
		
		if (!DBstandard._fieldsProto) {
			await conn.execute('INSERT INTO type VALUES (?,?,?)', [body.type, nowTime, nowTime]);
		} else {
			flag = false;
		}


		if (flag) {
			await fireDB.collection(body.type).doc(body.subject).set(body.standard);
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
				mandatory : body.mandatory
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


