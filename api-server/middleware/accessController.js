const jwt = require('jsonwebtoken');
let redisCon = "";
require('../db/redisCon.js')().then((res) => redisCon = res);

exports.verifyToken = async (req, res, next) => {
	try {
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
		const DBSearchResult = await redisCon.get(req.decoded.id);
		if (DBSearchResult !== null) {
			return next();	
		} else {
			throw new Error('TokenExpiredError');
		}
		
	} catch (err) {
		if (err.name == "TokenExpiredError") {
			return res.status(401).json({
					error : 'Unauthorized HTTP',
					message: '토큰이 만료됐습니다.'
				});
		}
		return res.status(401).json({
					error : 'Unauthorized HTTP',
					message: '유효하지 않은 토큰입니다.'
				});
	}
}

exports.normalAccess = async (req, res, next) => {
	try {
		const userAccessLevel = req.decoded.auth;
		const allowAccessLevels = ['군무원','병사','간부','등록자','개설자'];
		if (allowAccessLevels.includes(userAccessLevel)) {
			return next();
		} else {
			throw new Error('허가되지 않은 등급의 접근입니다.');
		}
	} catch (err) {
		return res.status(401).json({
					error : 'Unauthorized HTTP',
					message: err.message
				});
	}
}

exports.managerAccess = async (req, res, next) => {
	try {
		const userAccessLevel = req.decoded.auth;
		const allowAccessLevels = ['등록자','개설자'];
		if (allowAccessLevels.includes(userAccessLevel)) {
			return next();
		} else {
			throw new Error('허가되지 않은 등급의 접근입니다.');
		}
	} catch (err) {
		return res.status(401).json({
					error : 'Unauthorized HTTP',
					message: err.message
				});
	}
}

exports.supervisorAccess = async (req, res, next) => {
	try {
		const userAccessLevel = req.decoded.auth;
		const allowAccessLevels = ['개설자'];
		if (allowAccessLevels.includes(userAccessLevel)) {
			return next();
		} else {
			throw new Error('허가되지 않은 등급의 접근입니다.');
		}
	} catch (err) {
		return res.status(401).json({
					error : 'Unauthorized HTTP',
					message: err.message
				});
	}
}
