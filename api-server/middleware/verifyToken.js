const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
	try {
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
		return next();
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