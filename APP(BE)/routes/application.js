const express = require('express');
const router = express.Router();
const {verifyToken,normalAccess } = require('../middleware/accessController.js');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

router.get('/',verifyToken,normalAccess, async (req, res) => {
	try {
		const [members, fields] = await conn.execute('SELECT rep_id, members, message FROM appliation');
		res.status(200).json({
			message: "현재 신청내역이 있는 모든 인원 현황입니다",
			applicants: members
		});
	} catch (err) {
		console.error(err);
		return res.status(506).json({
			error: "DATABASE ERROR / Variant Also Negotiates",
			message : "DB query 도중 문제가 발생했습니다."
		});
	}
});


router.get('/:noticeId/',verifyToken,normalAccess, async (req, res) => {
	try {
		const params = req.params;
		const issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [params.noticeId]);
		const [member, fields] = await conn.execute('SELECT members, message, onChain FROM application WHERE issue_id = ?', [issueId[0][0].issue_id]);
		
		res.status(200).json({
			message: "해당 공지에 신청한 인원 현황입니다",
			applicants : member
		});
	} catch (err) {
		console.error(err);
		return res.status(406).json({
				error : "Not Acceptable", 
				message: "잘못된 공지 정보입니다."
			});
	}
});

router.post('/:noticeId/regist',verifyToken,normalAccess, async (req, res) => {
	try {
		const nowTime = moment().format("YYYY-M-D H:m:s");
		const token = req.decoded;
		const params = req.params;
		const body = req.body;
		const issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [params.noticeId]);
		if (issueId[0].length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "잘못된 공지 정보입니다."
			});
		}
		/** const members = [];
		for await (let member of body.members) {
			console.log(member);
			const memberList = await conn.execute('SELECT * FROM user WHERE id = ?',[member]);
			if (memberList[0].length === 0) {
				return res.status(406).json({
					error : "Not Acceptable", 
					message: "신청자 목록에 존재하지 않는 유저가 있습니다."
				});
			} else {
				const memberAff = await conn.execute('SELECT * from affiliation WHERE user_id = ?',[memberList[0][0].id]);
				delete memberAff[0][0].id
				memberAff[0][0]['user_name'] = memberList[0][0].name;
				memberAff[0][0]['class'] = memberList[0][0].class;
				members.push(memberAff[0][0]);
			}
		}*/

		
		const member = [];
		const memberList = await conn.execute('SELECT * FROM user WHERE id = ?',[body.member]);
		if (memberList[0].length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "신청자 목록에 존재하지 않는 유저가 있습니다."
			});
		} else {
			const memberAff = await conn.execute('SELECT * from affiliation WHERE user_id = ?',[memberList[0][0].id]);
			delete memberAff[0][0].id
			memberAff[0][0]['user_name'] = memberList[0][0].name;
			memberAff[0][0]['class'] = memberList[0][0].class;
			member.push(memberAff[0][0]);
		}
		
		
		const bind = [null, issueId[0][0].issue_id, token.id, JSON.stringify(member[0]), body.message, nowTime, nowTime, "0"]
		await conn.execute('INSERT INTO application VALUES (?,?,?,?,?,?,?,?)', bind);

		res.status(201).json({
			message: "해당 공지에 신청을 완료했습니다.",
			member: member[0]
		});	
	} catch (err) {
		console.error(err);
		return res.status(406).json({
			error : "Not Acceptable", 
			message: "요청 데이터의 형식이 잘못됐습니다. 요청 JSON을 확인해주세요."
		});
	}
	
});
router.post('/:noticeId/edit',verifyToken,normalAccess, async (req, res) => {
	try {
		const nowTime = moment().format("YYYY-M-D H:m:s");
		const token = req.decoded;
		const params = req.params;
		const body = req.body;

		const issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [params.noticeId]);
		if (issueId[0].length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "잘못된 공지 정보입니다."
			});
		}
		
		const [repIdSelectResult, fields] = await conn.execute('SELECT * FROM application WHERE rep_id = ?',[token.id]);
		if (repIdSelectResult.length === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "대표 신청자 아이디로 로그인 해주십시오."
			});
		}
		

		const updateApplicationTable = [];
		let notFoundedFlag = false;

		for await (let key of  Object.keys(body)) {
			if (key === 'members') {
				const members = [];
				for await (let member of JSON.parse(body.members)) {
					const memberList = await conn.execute('SELECT * FROM user WHERE id = ?',[member]);
					if (memberList[0].length === 0) {
						notFoundedFlag = true
					} else {
						const memberAff = await conn.execute('SELECT * from affiliation WHERE user_id = ?',[memberList[0][0].id]);
						delete memberAff[0][0].id
						memberAff[0][0]['user_name'] = memberList[0][0].name;
						memberAff[0][0]['class'] = memberList[0][0].class;
						members.push(memberAff[0][0]);
					}
				}
				updateApplicationTable.push([key, JSON.stringify(members), issueId[0][0].issue_id, token.id]);
			} else if (key === 'message') {
				updateApplicationTable.push([key, body[key], issueId[0][0].issue_id, token.id]);
			} else {
				throw new Error('Client request key is not matched to the db column name.');
			}
		}

		if (notFoundedFlag) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "신청자 목록에 존재하지 않는 유저가 있습니다."
			});
		}


		for await (let inform of updateApplicationTable) {
			await conn.execute(`UPDATE application SET ${inform[0]} = '${inform[1]}' WHERE issue_id = '${inform[2]}' AND rep_id = '${inform[3]}'`);
			await conn.execute(`UPDATE application SET updated_at = '${nowTime}' WHERE issue_id = '${inform[2]}' AND rep_id = '${inform[3]}'`);
		}
		
		return res.status(200).json({
			message: '보내주신 내용대로 업데이트에 성공했습니다.'
		});
	} catch (err) {
		console.error(err);
		return res.status(406).json({
			error: "Not Acceptable",
			message: "주어진 JSON 데이터의 형식이 올바르지 않습니다. JSON 데이터를 확인해주세요."
		})
	}
});

router.delete('/:noticeId/',verifyToken,normalAccess, async (req, res) => {
	try {
		const token = req.decoded;
		const params = req.params;

		const issueId = await conn.execute('SELECT issue_id FROM notice WHERE id = ?', [params.noticeId]);
		const deleteApplication = await conn.execute('DELETE FROM application WHERE rep_id = ? AND issue_id = ?', [token.id, issueId[0][0].issue_id]);

		if (deleteApplication[0].affectedRows === 0) {
			return res.status(406).json({
				error : "Not Acceptable", 
				message: "공지번호와 대표신청자의 정보가 연관성이 있는지 확인하세요."
			});
		}
		return res.status(200).json({
			message: "대표신청자가 공지에 신청한 내역을 모두 삭제했습니다."
		});
	} catch (err) {
		console.error(err);
		return res.status(406).json({
				error : "Not Acceptable", 
				message: "잘못된 공지 정보입니다."
		});
	}
});
module.exports = router;



