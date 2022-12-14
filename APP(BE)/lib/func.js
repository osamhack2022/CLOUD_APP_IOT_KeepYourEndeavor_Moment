const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const sanitizeHtml = require('sanitize-html');

exports.timeChecker = (test_date, apply_date, res) => {
	console.log(test_date,apply_date)
	if (test_date === undefined || apply_date === undefined ) {
		return null
	}
	const testDate = moment(test_date).valueOf();
	const applyDate = moment(apply_date).valueOf();
	test_date = moment(test_date).format("YYYY-M-D H:m:s");
	apply_date = moment(apply_date).format("YYYY-M-D H:m:s");
	console.log(test_date, apply_date);
	if (!moment(test_date, "YYYY-M-D H:m:s").isValid() || !moment(apply_date, "YYYY-M-D H:m:s").isValid()) {
		return res.status(406).json({
			error : "Not Acceptable", 
			message: "잘못된 날짜 정보입니다. 형식을 지켜주세요. `YYYY-M-D H:m:s`"
		});
	} else if (moment().valueOf() > Math.min(testDate, applyDate)) {
		return res.status(406).json({
			error : "Not Acceptable", 
			message: "현재보다 이전 값을 공지 연관 신청일로 사용할 수 없습니다."
		});
	} else if ((testDate - applyDate) < 259200000) {
		return res.status(406).json({
			error : "Not Acceptable", 
			message: "시험 날은 신청 날보다 최소 3일 후에 실시되어야 합니다."
		});
	}
}

exports.convertStandard = (standard) => {
	const conversionStandard = {}
	Object.keys(standard).forEach((key) => {
		conversionStandard[key] = standard[key]["stringValue"]
	});
	return conversionStandard
}

exports.typeFilter = async (dbStandard, standard, flags) => {
	Object.keys(dbStandard).forEach((v) => {
		const data = dbStandard[v].stringValue	
		if (data.split(":").length === 2) {
			flags.type = "시간"
			standard.push({'std' : v, 'data' : moment(data, "m:s").valueOf()});
		} else if (data.split(":").length === 1) {
			flags.type = "숫자"
			standard.push({'std' : v, 'data' : data});
		} else {
			flags.type = "이수"
		}
	});
}
