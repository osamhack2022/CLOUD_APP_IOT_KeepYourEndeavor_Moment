const express = require('express');
const router = express.Router();
const {verifyToken, normalAccess,managerAccess} = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const { makeHashedValue } = require('../lib/security.js');
const { timeChecker, convertStandard } = require('../lib/func.js');
let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const fireDB = require('../db/firestoreCon.js');


router.get('/', verifyToken, normalAccess, async(req, res) => {
	try {
		const [noticeSelectResult, field] = await conn.execute('SELECT notice.id as notice_id, title, author_id as notice_author_id, test_date, apply_date, notice.created_at as notice_created_at , notice.updated_at as notice_updated_at, description, issue_id ,type, subject, issuer_id FROM notice INNER JOIN issue ON notice.issue_id = issue.id');
		
		res.status(200).json({
			message : "등록된 notice들을 성공적으로 전송했습니다.",
			notices : noticeSelectResult
		});
	} catch (err) {
		console.error(err);
		return res.status(506).json({
			error: "DATABASE ERROR / Variant Also Negotiates",
			message : "DB query 도중 문제가 발생했습니다."
		});
	}
});

router.post('/regist', verifyToken ,managerAccess, async (req, res) => {
	try {
		const nowTime = moment().format("YYYY-M-D H:m:s");
		const token = req.decoded;
		const {title, issue_id, manager_id ,test_date, apply_date, description} = req.body;
		timeChecker(test_date, apply_date, res);
		const id = await makeHashedValue(title);

		const testTime = moment(test_date).add(9,'h').format("YYYY-M-D H:m:s");
		const applyTime = moment(apply_date).add(9,'h').format("YYYY-M-D H:m:s");
		const bind = [id, title, issue_id,manager_id ,token.id, testTime, applyTime, description,nowTime,nowTime];

		await conn.execute('INSERT INTO notice VALUES (?,?,?,?,?,?,?,?,?,?)', bind);

		return res.status(201).json({
			message:"공지를 성공적으로 등록했습니다."
		});
	} catch (err) {
		console.error(err);
		return res.status(406).json({
			error: "Not Acceptable",
			message : "중복된 공지 이름이거나 이슈 아이디가 잘못됐습니다."
		});
	}

});

router.get('/:noticeId', verifyToken ,managerAccess, async (req, res) => {
	try {
		const params = req.params;
		const [noticeSelectResult, field] = await conn.execute('SELECT notice.id as notice_id, title, author_id as notice_author_id, test_date, apply_date, notice.created_at as notice_created_at , notice.updated_at as notice_updated_at,issue_id ,description,type, subject, issuer_id  FROM notice INNER JOIN issue ON notice.issue_id = issue.id WHERE notice.id = ?', [params.noticeId]);
		const [issueSelectResult, Issuefield] = await conn.execute('SELECT * FROM issue WHERE id = ?', [noticeSelectResult[0].issue_id]);
		const {type, subject} = issueSelectResult[0]
		const standard = await fireDB.collection(type).doc(subject).get();
		if (standard._fieldsProto === undefined) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "공지에 대응되는 이슈에 기준이 없습니다. 1. 이슈에 해당하는 기준을 생성해주세요. 2. 이슈를 삭제하고 재생성해주세요"
			});
		}

		if (noticeSelectResult.length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "올바르지 않은 공지 넘버 입니다."
			});
		}

		return res.status(200).json({
			message : "notice를 성공적으로 전송했습니다.",
			notice : noticeSelectResult[0],
			issue : issueSelectResult[0],
			standard : convertStandard(standard._fieldsProto)
		});
	} catch (err) {
		console.error(err);
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."
		});
	}
});

router.post('/:noticeId/edit', verifyToken ,managerAccess, async (req, res) => {
	try {
		const params = req.params;
		const body = req.body;
		const nowTime = moment().format("YYYY-M-D H:m:s");

		const noticeAllowKeys = ['title','test_date','apply_date','description'];
		const updateNoticeTable = [];
		const dateChangeFlag = [];
		
		const clientRequestUpdateKey = Object.keys(body);
		clientRequestUpdateKey.forEach((key) => {
			if (body[key] !== "") {
				if (noticeAllowKeys.includes(key)) {
					if (key === 'test_date' || key === 'apply_date') {
							dateChangeFlag.push(key);
							updateNoticeTable.push([key, body[key], params.noticeId]);
					} else {
						updateNoticeTable.push([key, body[key], params.noticeId]);
					}
				} else {
					throw new Error('수정 컬럼 이름이 잘못됐습니다. 수정 가능한 컬럼 이름만 넣어주세요');
				}
			}
		});
		
		if (dateChangeFlag.length === 2) {
			timeChecker(body.test_date, body.apply_date, res);	
		} else if (dateChangeFlag.length === 1) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "시험 실시 일자와 시험 신청 일자는 하나만 변경할 수 없습니다. 두 칸 모두 채워주세요."
			});
		} else {
			console.log("No Change at Date");
		}
		
		
		for await (let inform of updateNoticeTable) {
			if (inform[0] === 'test_date' || inform[0] === 'apply_date') {
				await conn.execute(`UPDATE notice SET ${inform[0]} = '${moment(inform[1]).add(9,'h').format("YYYY-M-D H:m:s")}' WHERE id = '${inform[2]}'`);
				await conn.execute(`UPDATE notice SET updated_at = '${nowTime}' WHERE id = '${inform[2]}'`);
			} else {
				await conn.execute(`UPDATE notice SET ${inform[0]} = '${inform[1]}' WHERE id = '${inform[2]}'`);
				await conn.execute(`UPDATE notice SET updated_at = '${nowTime}' WHERE id = '${inform[2]}'`);
			}
		}
		return res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다!'
		});
	} catch (err) {
		console.error(err);
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."
		});
	}
});

router.delete('/:noticeId/', verifyToken ,managerAccess, async (req, res) => {
	try {
		const params = req.params;
		const deleteResult = await conn.execute(`DELETE FROM notice WHERE id = '${params.noticeId}'`);
		if (deleteResult[0].affectedRows === 0) {
				return res.status(406).json({
				error: "Not Acceptable",
				message: "존재하지 않는 공지 넘버입니다."
			});
		} else {
			return res.status(200).json({
				message: '공지 삭제가 완료됐습니다.'
			});	
		}
	} catch (err) {
		return res.status(409).json({
			error: "Conflict",
			message : "요청 처리 도중 충돌이 발생했습니다."
		});
	}
});


module.exports = router;
