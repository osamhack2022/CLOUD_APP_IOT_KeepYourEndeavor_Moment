const express = require('express');
const router = express.Router();
const {verifyToken,managerAccess } = require('../middleware/accessController.js');
const {typeFilter} = require('../lib/func.js');
const axios = require('axios');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const fireDB = require('../db/firestoreCon.js');

router.post('/push', verifyToken ,managerAccess, async (req, res, next) => {
  try {
		const {user, record, issue_id} = req.body;

		const [userSelectResult, fieldsUser] = await conn.execute('SELECT peer FROM user WHERE id = ?', [user]);
		const peer = userSelectResult[0].peer;
		res.peerInfo = peer;

		const [issueSelectResult, fieldsIssue] = await conn.execute('SELECT * FROM issue WHERE id = ?', [issue_id]);
		if (issueSelectResult.length === 0) {
			return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '등록되지 않은 issue에 대한 온체인 요청입니다.'
				}
			);
		}
		
		const DBStandard = await fireDB.collection(issueSelectResult[0].type).doc(issueSelectResult[0].subject).get();
		const standard = []
		const flags = {
			type : "",
			result : ""
		}
		typeFilter(DBStandard._fieldsProto, standard, flags);
		
		standard.sort(function (a, b) { 
			return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;  
		});
		console.log(standard);
		if (flags.type === "시간") {
			const checkTime = moment(record,"m:s").valueOf();

			standard.some((std) => {
				if (std.data >= checkTime) {
					flags.result = std.std;
					return true;
				}
			});
		} else if ( flags.type === "숫자" ) {
			const check = parseInt(record,10);

			let stdFlag = true;
			for(let i = 0; i < standard.length - 1 ; i++) {
				if (parseInt(standard[i].data) <= check) {
					if (check < parseInt(standard[i+1].data)){
						stdFlag = false;
						flags.result = standard[i].std;
						break;
					}
				}
			}
			if (stdFlag) {
				flags.result = "특"
			}
		} else {
			flags.result = "PASS"
		}
		
		const userRecord = {
			data : {
				user,
				result : flags.result,
				issue_id
			}
		}
		
		await axios.post(`${peer}/v1/block`, userRecord); 
		//const response = await axios.post(`http://api.jerrykang.com/v1/block`, userRecord); // 테스트에만 일로
		await conn.execute(`UPDATE application SET onChain = '1' WHERE rep_id = '${user}'`);
		return res.status(201).json(
			{
				message : `${peer}에 해당 데이터를 온체인 시켰습니다.`,
				userRecord,
				onChainResult : "true"
			}
		);
	} catch (err) {
		console.error(err);
		return res.status(406).json(
			{
				error:'Not Acceptable', 
				message : `${res.peerInfo} 가 존재하지 않거나 구동중이지 않습니다.`,
				onChainResult: "false"
			}
		);
	}
});

module.exports = router;
