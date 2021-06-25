/**
 * Node.js 서버는 빠르게 확인, 빠르게 죽이고, 빠르게 재시작하는 전략을 가져간다.
 * https://deview.kr/data/deview/session/attach/1600_T1_%EC%86%90%EC%B0%AC%EC%9A%B1_%EC%96%B4%EC%84%9C%EC%99%80_SSR%EC%9D%80_%EC%B2%98%EC%9D%8C%EC%9D%B4%EC%A7%80.pdf
 */
// https://expressjs.com/ko/api.html
const path = require('path');
const http = require('http');
const https = require('https'); 
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

// env
const env = require(path.resolve(__dirname, '../config/env'));
const paths = require(path.resolve(__dirname, '../config/paths'));

// app
const app = express(); 

// Exception Handler 등록
// UncatchedException 이 발생하면 Node.js 인스턴스가 죽음(서버다운) 방지
// https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
process.on('uncaughtException', (error) => {
	console.log('Caught exception: ' + error);
});

// view engine setup
app.set('view engine', 'ejs'); // view 엔진 설정 - index.ejs 등 확장자 - http://ejs.co/
app.set('views', path.resolve(__dirname, '../pages')); // views 디렉토리 설정 - response.render('경로') 사용

// express 미들웨어 설정
app.use(cors()); // cors 관련 정책
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// 고정 경로 설정 (JS, CSS, Images, Files 등 폴더 연결)
// app.use(express.static('../경로'))) 했을 경우, $ yarn server 을 실행시키는 명령은 root 이므로, root 기준 상대경로가 설정됨
// app.use(express.static(path.resolve(__dirname, '../경로')))
// app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use('/test', express.static(path.resolve(paths.appPath, 'test')));
app.use(express.static(path.resolve(paths.appPath, 'dist')));
app.use(express.static(path.resolve(paths.appPath, 'public')));

// express 전역변수 설정 (response.locals)
/*app.use(function(request, response, next) {
	// 전역 데이터 설정 
	Object.assign(response.locals, webpack);
	next();
});*/

// redirect HTTP to HTTPS 
/*app.all('*', (request, response, next) => { 
	let protocol = request.headers['x-forwarded-proto'] || request.protocol; 
	if(protocol == 'https') { 
		next(); 
	}else { 
		let from = `${protocol}://${request.hostname}${request.url}`; 
		let to = `https://'${request.hostname}${request.url}`; 
		// log and redirect 
		console.log(`[${request.method}]: ${from} -> ${to}`); 
		response.redirect(to); 
	} 
});*/

// routes - app.use('라우트', '하위 라우트')
app.get('/ysm', (request, response) => {
	response.end('TEST SERVER');
});
//app.use('/api/summary', require(path.resolve(paths.appPath, 'routes/summary')));
//app.use('/api/request', require(path.resolve(paths.appPath, 'routes/request')));
//app.use('/api/timing', require(path.resolve(paths.appPath, 'routes/timing')));
//app.use('/', require(path.resolve(paths.appPath, 'routes/dashboard')));
app.use('/', require(path.resolve(paths.appPath, 'routes/test')));

// catch 404 and forward to error handler
// https://expressjs.com/ko/guide/error-handling.html
app.use((request, response, next) => {
	//const error = new Error(`${request.method} ${request.url} 라우터가 없습니다.`);
	//error.status = 404;
	//next(error);
	
	// next app.use 파라미터로 error 정보 전달 
	next(createError(404));
});
app.use(function(error, request, response, next) {
	// set locals, only providing error in development
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error : {};
  
	// render the error page
	response.status(error.status || 500);
	response.send('페이지 없음!');
	//response.render('error');
});

// 서버 실행
/*const server = app.listen(env.port, () => {
	console.log(`Server ${env.port}`);
});*/
//app.listen(env.port, () => console.log(`app is working at http://localhost:${env.port}`));
const httpServer = http.createServer(app);
httpServer.listen(env.port, () => {
	console.log('Server', env.port);
});
/*if(fs.existsSync(path.resolve(__dirname, '../.key/ssl.json'))) {
	const ssl = require(path.resolve(__dirname, '../.key/ssl.json'));
	if(ssl && typeof ssl === 'object' && fs.existsSync(ssl.pathKey) && fs.existsSync(ssl.pathCert)) {
		const credentials = {
			key: fs.readFileSync(ssl.pathKey), // 키 파일의 경로
			cert: fs.readFileSync(ssl.pathCert), // 인증서 파일의 경로
		};
		const httpsServer = https.createServer(credentials, app);
		httpsServer.listen(env.portSSL, () => {
			console.log('Server SSL', env.portSSL);
		});
	}
}*/
