const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const {verifyToken, normalAccess,managerAccess, supervisorAccess} = require('../middleware/accessController.js');
const fireDB = require('../db/firestoreCon.js');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);



router.get('/', verifyToken, supervisorAccess,async (req, res) => {
	try {
		const [types, fields] = await conn.execute('SELECT id FROM type');
		const standards = {}
		for await (let type of types) {
				const snapshot = await fireDB.collection(type.id).get();
				snapshot.forEach((doc) => {
					if (doc.id === "merkle"){
						console.log(doc.id);
					} else {
						const detail = {};
						detail[doc.id] = doc.data();
						standards[type.id] = detail;
					}
				});
			}
		console.log(standards);
		res.status(200).json({
			message: "standard 들을 모두 보냅니다",
			standards
		});
	} catch (err) {
		res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});

router.post('/delete', verifyToken, supervisorAccess,async (req, res) => {
	try {
		const standardInfo = req.body;
		const isInFireStore = await fireDB.collection(standardInfo.collection).doc(standardInfo.doc).get();
		
		if (!standardInfo.doc ||!standardInfo.collection ) {
			return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : 'collection과 doc의 이름을 모두 입력하셔야 합니다.'
				}
			);
		} else if (!isInFireStore._fieldsProto) {
			return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '입력하신 collection과 doc의 이름에 해당하는 standard가 존재하지 않습니다.'
				}
			);
		} else {
			await fireDB.collection(standardInfo.collection).doc(standardInfo.doc).delete();
			return res.status(200).json({
				message : '성공적으로 기준을 삭제했습니다.'
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Interval server Error",
			message : "예기치 못한 에러가 발생했습니다."
		});
	}
});


module.exports = router;


