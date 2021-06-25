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
/*
-
express 미들웨어
미들웨어는 app.use 와 함께 사용됩니다. app.use(미들웨어)
app.use 에 매개변수가 request, response, next 인 함수를 넣으면 됩니다.
미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답 사이에 특별한 기능을 추가할 수 있습니다.
next 라는 세변째 매개변수는, 다음 미들웨어로 넘어가는 함수입니다. next 를 실행하지 않으면 다음 미들웨어가 실행되지 않습니다.
첫 번째 매체변수(인수)로 주소를 넣어주지 않는다면, 미들웨어는 모든 요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행된다고 보면 됩니다.

app.use(미들웨어)
app.use('/abc', 미들웨어)
app.use('/abc', 미들웨어, 미들웨어, 미들웨어...)
app.post('/abc/', 미들웨어)

-
next
next 함수에 인수를 넣을 수 있습니다. 단, 인수를 넣는다면 특수한 동작을 합니다.
route 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고,
그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동합니다. 이때의 인수는 에러 처리 미들웨어의 err 매개변수가 됩니다. 라우터에서 에러가 발생할 때 에러를 next(err)을 통해 에러 처리 미들웨어로 넘깁니다.
next(err)
(err, req, res, next) => {}

-
미들웨어 간에 데이터를 전달하는 방법도 있습니다.
세션을 사용한다면 req.session 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있습니다.
만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면 req 객체에 데이터를 넣어두면 됩니다.
app.use(
	(request, response, next) => {
		request.data = '데이터 넣기'; // 새로운 요청이 오면 request.data 는 초기화됩니다.
		next();
	},
	(request, response, next) => {
		console.log(request.data);
		next();
	}
);
app.use((request, response, next) => {
	console.log(request.data);
	next();
});
*/
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
