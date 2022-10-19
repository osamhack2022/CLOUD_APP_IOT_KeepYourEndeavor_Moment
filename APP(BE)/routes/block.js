const express = require('express');
const router = express.Router();
const {verifyToken,managerAccess } = require('../middleware/accessController.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
const fireDB = require('../db/firestoreCon.js');

router.post('/push', verifyToken ,managerAccess, async (req, res, next) => {
  try {
		const {user, record, issue_id} = req.body;
		const [userInfo, fieldsUser] = await conn.execute('SELECT peer FROM user WHERE id = ?', [user]);
		const peer = userInfo[0].peer;
		res.peerInfo = peer;
		const [issue, fieldsIssue] = await conn.execute('SELECT * FROM issue WHERE id = ?', [issue_id]);
		if (issue.length === 0) {
			return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '등록되지 않은 issue에 대한 온체인 요청입니다.'
				}
			);
		}
		
		const DBStandard = await fireDB.collection(issue[0].type).doc(issue[0].subject).get();
		const standard = []
		
		let type = ""
		Object.keys(DBStandard._fieldsProto).forEach(function(v){
			const data = DBStandard._fieldsProto[v].stringValue	
			if (data.split(":").length === 2) {
				type = "시간"
				standard.push({'std' : v, 'data' : moment(data, "m:s").valueOf()});
			} else if (data.split(":").length === 1) {
				type = "숫자"
				standard.push({'std' : v, 'data' : data});
			} else {
				type = "이수"
			}
		});
	
		
		
		let result = ""
		if (type === "시간") {
			const checkTime = moment(record,"m:s").valueOf();
			standard.sort(function (a, b) { 
				return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;  
			});
			console.log(checkTime);
			standard.some((std) => {
				if (std.data >= checkTime) {
					result = std.std;
					return true;
				}
			});
		} else if ( type === "숫자" ) {
			const check = parseInt(record,10);
			standard.sort(function (a, b) { 
				return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;  
			});
			let stdFlag = true;
			for(let i = 0; i < standard.length - 1 ; i++) {
				if (parseInt(standard[i].data) <= check) {
					if (check < parseInt(standard[i+1].data)){
						stdFlag = false;
						result = standard[i].std;
						break;
					}
				}
			}
			if (stdFlag) {
				result = "특"
			}
		} else {
			result = "PASS"
		}
		

		const userRecord = {
			data : {
				user,
				result,
				issue_id
			}
		}
		
		await axios.post(`${peer}/v1/block`, userRecord); 
		//const response = await axios.post(`http://api.jerrykang.com/v1/block`, userRecord); // 테스트에만 일로
		res.status(200).json(
			{
				message : `${peer}에 해당 데이터를 온체인 시켰습니다.`,
				userRecord
			}
		);
	} catch (err) {
		console.error(err);
		res.status(406).json(
			{
				error:'Not Acceptable', 
				message : `${res.peerInfo} 가 존재하지 않거나 구동중이지 않습니다.`
			}
		);
	}
});

module.exports = router;
