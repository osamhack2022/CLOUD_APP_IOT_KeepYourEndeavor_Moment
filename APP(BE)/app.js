const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

require('dotenv').config();
app.set('port', process.env.PORT || 3000);

const cors = require('cors');

let corsOptions = {
		origin: ['http://172.30.1.22:5000','http://game.jerrykang.com', 'http://admin.jerrykang.com', 'http://localhost:5000'],
		credentials: true
}

app.use(cors(corsOptions));


// view engine setup
app.set('view engine', 'html');
nunjucks.configure('views', {
	express: app,
  watch: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
	secret : process.env.SECRET,
	httpOnly : true
  }
}));
// for postman 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// 라우터 부착
fs.readdirSync(path.join(__dirname, '/routes'))
    .filter(file => file.indexOf('.') !== 0  && file.slice(-3) === ".js")
    .forEach(routeFile => {
			app.use(`/${routeFile.split('.')[0]}`, require(`./routes/${routeFile}`));
		});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
	console.log(app.get('port') +' 에서 대기중');
})