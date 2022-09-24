const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/verifyToken');
/* GET home page. */ 
router.get('/', verifyToken ,function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
