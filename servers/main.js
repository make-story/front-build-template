/**
 * Node.js 서버는 빠르게 확인, 빠르게 죽이고, 빠르게 재시작하는 전략을 가져간다.
 * https://deview.kr/data/deview/session/attach/1600_T1_%EC%86%90%EC%B0%AC%EC%9A%B1_%EC%96%B4%EC%84%9C%EC%99%80_SSR%EC%9D%80_%EC%B2%98%EC%9D%8C%EC%9D%B4%EC%A7%80.pdf
 */
// https://expressjs.com/ko/api.html
const fs = require('fs'); 
const path = require('path');
const http = require('http');
const https = require('https'); 
const cors = require('cors');
const createError = require('http-errors');
const compression = require('compression'); // Gzip
const dotenv = require('dotenv');
//const morgan = require('morgan');
//const fetch = require('node-fetch'); // https://github.com/request/request/issues/3143
const express = require('express'); // http://expressjs.com/ko/4x/api.html 가이드 문서 
const session = require('express-session'); // https://github.com/expressjs/session
const subdomain = require('express-subdomain'); // https://www.npmjs.com/package/express-subdomain
//const multer = require('multer'); // multipart/form-data, new FormData() 처리를 위한 미들웨어 - https://github.com/expressjs/multer - body parser 기능 포함되어 있음(request.body)

// parser
const cookieParser = require('cookie-parser');

// config
const paths = require(path.resolve(__dirname, '../config/paths'));
const env = require(path.resolve(__dirname, '../config/env'));

/**
 * Exception Handler 등록 (http://nodeqa.com/nodejs_ref/1)
 */
// UncatchedException 이 발생하면 Node.js 인스턴스가 죽음(서버다운) 방지
// https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
process.on('uncaughtException', (error) => {
	console.log('Caught exception: ' + error);
});

/**
 * ENV 세팅
 */
dotenv.config(); // 루트 폴더 '.env' 파일 

/**
 * express
 */
const app = express(); 

// app.set(name, value)
// https://expressjs.com/ko/api.html#app.settings.table
// http://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'ejs'); // view 엔진 설정 - index.ejs 등 확장자 - http://ejs.co/
app.set('views', path.resolve(__dirname, '../pages')); // views 디렉토리 설정 - response.render('경로') 사용

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

// bodyParser
// 익스프레스 4.16.0 버전부터 body-parser 미들웨어의 일부 기능이 익스프레스에 내장
//app.use(bodyParser.urlencoded({extended: false, limit: '200mb'})); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json({limit: '200mb'})); // parse application/json
//app.use(bodyParser.raw()); // 요청의 본문이 버퍼 데이터 일 때
//app.use(bodyParser.text()); // 요청의 본문이 텍스트 데이터 일 때
// 'Failed to load resource: the server responded with a status of 413 (Payload Too Large)' 에러를 해결하기 위해 limit 값을 설정해준다.
app.use(express.json({ limit: '200mb' })); // parse application/json
app.use(express.urlencoded({ extended: false, limit: '200mb' })); // parse application/x-www-form-urlencoded

// 쿠키 / 세션
const COOKIE_SECRET = 'test';
app.use(cookieParser());
/*
express-session 1.5 버전 이전에는 내부적으로 cookie-parser를 사용하고 있어서 cookie-parser 미들웨어보다 뒤에 위치해야 했지만,
1.5 버전 이후부터는 사용하지 않게 되어 순서가 상관없어졌습니다. 그래도 현재 어떤 버전을 사용하고 있는지 모른다면 
cookie-parser 미들웨어 뒤에 놓는 것이 안전합니다.
*/
/*app.use(session({  
	resave: false, // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할 지 설정
	saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것
	// 세션관리시 클라이언트에 쿠키를 보냅니다.
	// 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는데 secret의 값이 필요합니다.
	// cookie-parser 의 secret 과 같게 설정하는 것이 좋습니다.
	secret: COOKIE_SECRET,
	// cookie 옵션은 세션 쿠키에 대한 설정입니다.
	// magAge, domain, path, expires, sameSite, httpOnly, secure 등 일반적인 쿠키 없션이 모두 제공됩니다.
	cookie: {
		httpOnly: true,
		secure: false,
	},
	// 세션 쿠키의 이름은 name 옵션으로 설정합니다. (기본이름 : connect.sid)
	name: 'session-cookie',
	// 기본적으로 메모리에 세션을 저장하도록 되어 있어, 서버를 재시작하면 메모리가 초기화되어 세션이 모두 사라집니다.
	// 따라서 배포시에는 store에 데이터베이스를 연결하여 세션을 유지하는 것이 좋습니다.
	//store
}));*/

// log
//app.use(morgan('dev'));

// Gzip 압축
app.use(compression()); 
//app.use(express.compress());

// subdomain
//app.use(subdomain('kit', (require, response, next) = { }));

// 고정 경로 설정 (JS, CSS, Images, Files 등 폴더 연결)
// app.use(express.static('../경로'))) 했을 경우, $ yarn server 을 실행시키는 명령은 root 이므로, root 기준 상대경로가 설정됨
// app.use(express.static(path.resolve(__dirname, '../경로')))
// app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.use('/test', express.static(path.resolve(paths.appPath, 'test')));
app.use(express.static(path.resolve(paths.appPath, 'dist')));
app.use(express.static(path.resolve(paths.appPath, 'public')));

// request 에 값 포함하여 전달
app.use((request, response, next) => {
	// 전역 데이터 설정 (사용자 정보 등)
	//request.passport = passport;
	//Object.assign(response.locals, 'test');
	//request.locals.user = request?.user || '';
	next();
});

// 스트림
// 스트림을 이용하면 큰 파일을 읽을 때도 메모리를 효율적으로 사용할 수 있다. (readFile 를 이용할 경우 파일의 전체내용을 메모리로 가져오기 때문에 메모리에 여유가 없다면 부담이 될 수 있다.)
/*app.get('/readFile', (request, response) => {
	const fileStream = fs.createReadStream('./bog_file.zip');
	fileStream.pipe(response);
});*/
/*app.post('/files/editor', multer({ dest: __dirname + '/uploads/'}).any(), function(request, response) {
	const files = request.files;
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
// servers 폴더(main.js) -> routes 폴더 -> pages 폴더
app.use('/ysm', (request, response) => response.end('TEST SERVER'));
//app.use('/api/summary', require(path.resolve(paths.appPath, 'routes/summary')));
//app.use('/api/request', require(path.resolve(paths.appPath, 'routes/request')));
//app.use('/api/timing', require(path.resolve(paths.appPath, 'routes/timing')));
//app.use('/', require(path.resolve(paths.appPath, 'routes/dashboard')));
app.get('/', require(path.resolve(paths.appPath, 'routes/test'))); // HTTP GET 호출에 대한 응답

/**
 * error handler
 */
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

/**
 * 서버 콜 test
 */
// https://www.npmjs.com/package/node-fetch
/*async function getRequest() {
	const url = 'http://makestory.net/media/categories/documents';
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
}
getRequest();*/

/**
 * 서버 실행
 */
/*const server = app.listen(env.port, () => {
	console.log(`Server ${env.port}`);
});*/
//const server = app.listen(env.port, () => console.log(`web server -> http://localhost:${env.port}`)); 
const server = http.createServer(app);
server.listen(env.port, () => {
	console.log('Server', env.port);
});
/*if(fs.existsSync(path.resolve(__dirname, '../.key/ssl.json'))) { // HTTPS SSL
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
