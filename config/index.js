/**
 * config (env)
 */
const path = require('path'); 
const dotenv = require('dotenv');

// NODE_ENV: development, production
dotenv.config({ 
    path: path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV || 'local'}`) // local, development, production
});
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('ACTIVE', process.env.ACTIVE);
console.log('PORT', process.env.PORT);

// 개발환경 (상수)
// NODE_ENV: development, production
const PHASE_LOCAL = 'local'; // 개발환경: 로컬
const PHASE_DEVELOPMENT = 'development'; // 개발환경: 테스트
const PHASE_PRODUCTION = 'production';  // 개발환경: 운영

// 쉘 명령에서 '--옵션값' 존재여부
// $ node <실행 파일> --옵션키
const isArgv = (argv) => process.argv.indexOf(`--${argv}`) >= 0;

// 쉘 명령에서 '--옵션키'의 '옵션값' 반환
// $ node <실행 파일> --옵션키 옵션값
const getArgv = (argv) => {
	let value = null;
	if(process.argv.includes(`--${argv}`) && process.argv[process.argv.indexOf(`--${argv}`)+1]) {
		value = process.argv[process.argv.indexOf(`--${argv}`)+1];
	}
	return value;
};

// process env 콜솔 로그 출력 
const setBuildConsoleLog = () => {
	// 시스템 환경변수 
	//console.log('[env] process.env', process.env); 
	/*process.argv.forEach(function(val, index, array) {
		console.log(`[env] ${index} : ${val}`);
	});*/
	console.log('[env] USER', process.env.USER); // 예: 'jenkins'
	console.log('[env] HOME', process.env.HOME); // 예: '/Users/ysm0203'
	console.log('[env] PWD', process.env.PWD); // 예: '/usr/src/nodejs/build.git'
	console.log('[env] NODE', process.env.NODE); // 예: '/usr/local/bin/node'
	//console.log('[env] NODE_PATH', process.env.NODE_PATH);

	// npm 관련 정보 
	console.log('[env] npm_node_execpath', process.env.npm_node_execpath); // 예: '/usr/local/bin/node'
	console.log('[env] npm_config_node_version', process.env.npm_config_node_version); // 예: '10.9.0'
	console.log('[env] npm_config_registry', process.env.npm_config_registry); // 예: 'https://repo.cjoshopping.com/content/groups/npm_public_repository/'
	//console.log('[env] npm_config_globalconfig', process.env.npm_config_globalconfig); // 예: '/usr/local/etc/npmrc'
	//console.log('[env] npm_config_node_gyp', process.env.npm_config_node_gyp); // 예: '/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js'

	// Git 관련 환경변수
	process.env.GIT_BRANCH && console.log('[env] GIT_BRANCH', process.env.GIT_BRANCH); // 예: 'origin/master'
	process.env.GIT_COMMIT && console.log('[env] GIT_COMMIT', process.env.GIT_COMMIT); // 예: '33bed416e079de15ca729ef4a543bb7495343f45'

	// 젠킨스 관련 환경변수
	process.env.WORKSPACE && console.log('[env] WORKSPACE', process.env.WORKSPACE); // 예: '/var/lib/jenkins/workspace/front display build'
	process.env.JOB_NAME && console.log('[env] JOB_NAME', process.env.JOB_NAME); // 예: 'front display build'
	process.env.BUILD_TAG && console.log('[env] BUILD_TAG', process.env.BUILD_TAG); // 예: 'jenkins-front display build-9'
	process.env.BUILD_DISPLAY_NAME && console.log('[env] BUILD_DISPLAY_NAME', process.env.BUILD_DISPLAY_NAME); // 예: '#9'
	process.env.BUILD_NUMBER && console.log('[env] BUILD_NUMBER', process.env.BUILD_NUMBER); // 예: '9'
	//process.env.BUILD_ID && console.log('[env] BUILD_ID', process.env.BUILD_ID); // 예: '9' - 젠킨스에서 사용하는 고유값 

	// 젠킨스에서 설정으로 통해 수동으로 추가한 환경변수 
	process.env.PROJECT && console.log('[env] PROJECT', process.env.PROJECT); // react 등 별도 프로젝트 빌드 
	process.env.ACTIVE && console.log('[env] ACTIVE', process.env.ACTIVE); // 사용자 설정값, 개발환경(dev/qa/stg/prd), 웹팩의 모드(development/production)가 아닌 개발환경
};

module.exports = {
	phase: {
		local: PHASE_LOCAL,
		development: PHASE_DEVELOPMENT,
		production: PHASE_PRODUCTION,
	},
	isArgv,
	argv: getArgv,
    buildConsoleLog: setBuildConsoleLog,
};