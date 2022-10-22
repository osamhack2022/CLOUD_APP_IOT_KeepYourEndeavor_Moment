const express = require('express');
const router = express.Router();
const {verifyToken, supervisorAccess} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { makeHashedValue } = require('../lib/security.js');
const { convertStandard } = require('../lib/func.js');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const fireDB = require('../db/firestoreCon.js');


router.get('/', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const [issueSelectResult, field] = await conn.execute('SELECT * FROM issue');
		res.status(200).json({
			message : "등록된 issue들을 성공적으로 전송했습니다.",
			issues : issueSelectResult
		});
	} catch (err) {
		return res.status(506).json({
			error: "DATABASE ERROR / Variant Also Negotiates",
			message : "DB query 도중 문제가 발생했습니다."
		});
	}
});

router.get('/:issueId', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const params = req.params;
		
		const [issueSelectResult, field] = await conn.execute('SELECT * FROM issue WHERE id = ?', [params.issueId]);
		const standard = await fireDB.collection(issueSelectResult[0].type).doc(issueSelectResult[0].subject).get();
		if (standard._fieldsProto === undefined) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "존재하지 않는 기준에 대한 이슈입니다. 이슈를 삭제후 재생성해주세요"
			});
		}
		
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

router.post('/regist', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const nowTime = moment().format("YYYY-M-D H:m:s");
		const token = req.decoded;
		const id = await makeHashedValue(nowTime);
		const body = req.body;

		if (body.type === undefined || body.subject === undefined) {
			throw new Error();
		}

		const bind = [id, body.type, body.subject, token.id, body.mandatory, nowTime, nowTime];
		console.log(bind);
		await conn.execute('INSERT INTO type VALUES (?,?,?)', [body.type, nowTime, nowTime]);
		await conn.execute('INSERT INTO issue VALUES (?,?,?,?,?,?,?)', bind);
		await fireDB.collection(body.type).doc(body.subject).set(body.standard);
		const DBstandard = await fireDB.collection(body.type).doc(body.subject).get();
		res.status(201).json(
			{
				message : "issue 등록이 완료됐습니다.",
				issueId : id,
				mandatory : body.mandatory,
				standard: convertStandard(DBstandard._fieldsProto)
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
		const params = req.params;
		const issueSelectResult = await conn.execute('SELECT type, subject from issue WHERE id = ?',[params.issueId]);
		const isInFireStore = await fireDB.collection(issueSelectResult[0][0].type).doc(issueSelectResult[0][0].subject).get();
		
		if (!isInFireStore._fieldsProto) {
			return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '입력하신 collection과 doc의 이름에 해당하는 standard가 존재하지 않습니다.'
				}
			);
		} else {
			const deleteResult = await conn.execute(`DELETE FROM issue WHERE id = '${params.issueId}'`);
			await fireDB.collection(issueSelectResult[0][0].type).doc(issueSelectResult[0][0].subject).delete();
			if (deleteResult[0].affectedRows === 0) {
					return res.status(406).json({
						error: "Not Acceptable",
						message: "존재하지 않는 이슈 넘버입니다."
					});
			} else {
				return res.status(200).json({
					message : ' 성공적으로 기준을 삭제했습니다. '
				});
			}
		}
		
	} catch (err) {
		console.error(err);
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."
		});
	}
});


module.exports = router;


