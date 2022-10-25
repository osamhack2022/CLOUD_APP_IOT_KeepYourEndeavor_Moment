const express = require('express');
const router = express.Router();
const {verifyToken, normalAccess} = require('../middleware/accessController.js');
const axios = require('axios');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

let conn = "";
require('../db/sqlCon.js')().then((res) => conn = res);

/* GET home page. */ 
router.get('/', verifyToken ,normalAccess, async (req, res) => {
  try {
		const token = req.decoded;
		const [userSelectResult, fieldUser] = await conn.execute('SELECT * FROM user WHERE id =?', [token.id]);
		const peer = userSelectResult[0].peer;
		const response = await axios.get(`${peer}/v1/block?user=${token.id}`); //실제론 여기
		//console.log(response.data);
		//console.log(response.data.blocks);
		const usersData = []
		const temp = {}
		if (response.data) {
			response.data.blocks.forEach((data) =>{			
				const issueId = data.data.issue_id
				if ( temp[issueId] ) {
					data.data["generated_time"] = data.header.generated_time
					temp[issueId].push(data.data);
				} else {
					data.data["generated_time"] = data.header.generated_time
					temp[issueId] = [data.data]
				}
			});
		}

		
		for await (let key of Object.keys(temp)) {
			const [issueSelectResult, fieldIssue] =  await conn.execute('SELECT * FROM issue WHERE id = ?',[key]);
			if (temp[key].length === 1) {
				temp[key][0]["issue_subject"] = issueSelectResult[0]['subject'];
				temp[key][0]["issue_type"] = issueSelectResult[0]['type'];
				usersData.push(temp[key][0]);
			} else {
				const sortedTemp = temp[key].sort((a,b) => {
					if(a.generated_time > b.generated_time) return -1;
					if(a.generated_time < b.generated_time) return 1;
					return 0;
				  });
				sortedTemp[0]["issue_subject"] = issueSelectResult[0]['subject'];
				sortedTemp[0]["issue_type"] = issueSelectResult[0]['type'];
				usersData.push(sortedTemp[0]);
			}
        }


		console.log(usersData);
		
		return res.status(200).json(
			{
				message : `${peer} 원장을 가져왔습니다.`,
				usersData
			}
		);
	} catch (err) {
		console.error(err);
		return res.status(406).json(
			{
				error:'Not Acceptable', 
				message : `원장이 존재하지 않습니다.`
			}
		);
	}
});


module.exports = router;