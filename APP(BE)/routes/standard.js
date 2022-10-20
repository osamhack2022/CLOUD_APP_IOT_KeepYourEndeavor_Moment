const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const {verifyToken, supervisorAccess} = require('../middleware/accessController.js');
const fireDB = require('../db/firestoreCon.js');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

router.get('/', verifyToken, supervisorAccess, async (req, res) => {
	try {
		const [types, fields] = await conn.execute('SELECT id FROM type');
		const standards = {};
		for await (let type of types) {
				const snapshot = await fireDB.collection(type.id).get();
				standards[type.id] = []
				snapshot.forEach((doc) => {
					console.log(doc.id);
					if (doc.id === "merkle"){
						console.log(doc.id);
					} else {
						const detail = {};
						detail[doc.id] = doc.data();
						standards[type.id].push(detail);
					}
				});
			}
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

router.post('/post',  verifyToken, supervisorAccess,async (req, res) => {
	const body = req.body;
	const [typeSelectResult, field] = await conn.execute('SELECT * FROM type WHERE id = ?', [body.type]);
	if (typeSelectResult.length === 0) {
		return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '잘못된 type 종류입니다. type의 종류를 확인해주세요'
				}
			);
	}
	const standardRef = await fireDB.collection(body.type).doc(body.subject).get();
	
	if (!standardRef._fieldsProto) {
			const standard = body.standard;
			await fireDB.collection(body.type).doc(body.subject).set(standard);
			return res.status(200).json({
				message: "기준 생성에 성공했습니다.",
				standard
			});
	} else {
		return res.status(406).json(
				{
					error:'Not Acceptable', 
					message : '이미 존재하는 기준입니다. 변경을 원할 시 삭제 후 재생성해주세요'
				}
			);
	}
	
	
});

router.delete('/', verifyToken, supervisorAccess,async (req, res) => {
	try {
		const body = req.body;
		const isInFireStore = await fireDB.collection(body.collection).doc(body.doc).get();
		
		if (!body.doc ||!body.collection ) {
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
			await fireDB.collection(body.collection).doc(body.doc).delete();
			return res.status(200).json({
				message : ' 성공적으로 기준을 삭제했습니다. '
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


