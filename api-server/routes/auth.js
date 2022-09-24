const express = require('express');
const router = express.Router();
let conn = "";
require('../db/sqlCon.js')()
.then((res) => {
	conn = res
});


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(conn);
  res.render('index', { title: 'Express' });
});

module.exports = router;
