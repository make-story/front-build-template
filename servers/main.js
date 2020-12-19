// https://expressjs.com/ko/api.html
const path = require('path'); 
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const paths = require('../config/paths');
const env = require(path.resolve(paths.appPath, 'config/env'));

const app = express(); 

// view engine setup
app.set('view engine', 'ejs'); // view 엔진 설정 - index.ejs 등 확장자 - http://ejs.co/
app.set('views', path.resolve(__dirname, '../pages')); // views 디렉토리 설정 - response.render('경로') 사용

// express 미들웨어 설정
app.use(cors()); // cors 관련 정책
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// 고정 경로 설정 (JS, CSS, Images, Files 등 폴더 연결)
//app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(paths.appPath, 'test')));
app.use(express.static(path.resolve(paths.appPath, 'dist')));
app.use(express.static(path.resolve(paths.appPath, 'public')));

// express 전역변수 설정 (response.locals)
/*app.use(function(request, response, next) {
	// 전역 데이터 설정 
	Object.assign(response.locals, webpack);
	next();
});*/

// routes - app.use('라우트', '하위 라우트')
//app.use('/api/summary', require(path.resolve(paths.appPath, 'routes/summary')));
//app.use('/api/request', require(path.resolve(paths.appPath, 'routes/request')));
//app.use('/api/timing', require(path.resolve(paths.appPath, 'routes/timing')));
//app.use('/test', require(path.resolve(paths.appPath, 'routes/test')));
//app.use('/', require(path.resolve(paths.appPath, 'routes/dashboard')));

// catch 404 and forward to error handler
app.use((request, response, next) => {
	next(createError(404));
});

// error handler
/*app.use(function(error, request, response, next) {
	// set locals, only providing error in development
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error : {};
  
	// render the error page
	response.status(error.status || 500);
	response.send('페이지 없음!');
	//response.render('error');
});*/

// server listen
const server = app.listen(env.port, () => {
	console.log(`Server ${env.port}`);
});
