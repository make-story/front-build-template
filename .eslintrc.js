/*
-
ESLint 설치
https://eslint.org/docs/user-guide/getting-started
$ npm install -g eslint 
$ npm install -D eslint-config-airbnb-base eslint-plugin-import
eslint: ESLint 코어
eslint-config-airbnb: Airbnb의 eslint 스타일 가이드
eslint-plugin-import: ES2015+의 import/export 구문을 지원

-
ESLint + Typescript (TSLint 프로젝트가 deprecated 상태가 되고 ESLint에 통합)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html
https://github.com/typescript-eslint/typescript-eslint#packages-included-in-this-project
$ npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

-
ESLint + React
https://github.com/yannickcr/eslint-plugin-react#configuration
$ npm install -D eslint-plugin-react 

-
웹팩에서 로더로 실행
$ npm install -D eslint-loader

-
초기 설정파일 생성
$ eslint --init
.eslintrc.js 파일 생성됨
*/
module.exports = {
    // 환경(env): 프로젝트의 사용 환경을 설정한다.
	env: {
		browser: true,
		es2020: true,
		node: true, // node: true 는 webpack.config.js 빌드시 node 환경도 적용
	},
	
	// 파서
	parser: "@typescript-eslint/parser",

	// 파서 옵션(parserOptions): ESLint 사용을 위해 지원하려는 Javascript 언어 옵션을 설정할 수 있다.
	parserOptions: {
		// 자바스크립트 버전
		//ecmaVersion: 11,
		//sourceType: "module",
		// Typescript
		project: "./tsconfig.json",
		parser: 'typescript-eslint-parser',
	},

	// 코드 포맷을 prettier로 설정
	plugins: [
		'prettier', 
		'react', 
		'@typescript-eslint'
	],

	// 확장(extends): 다른 ESLint 설정을 확장해서 사용할때 설정한다.
	// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
	// plugin:prettier/recommended: eslint-plugin-prettier + eslint-config-prettier 동시 적용
	// prettier/@typescript-eslint: prettier 규칙과 충돌하는 @typescript-eslint/eslint-plugin 규칙 비활성화
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],

	// ESLint가 무시할 디렉토리, 파일을 설정
	ignorePatterns: [
		"dist/", 
		"node_modules/"
	],
	
	// 규칙(rules): 프로젝트에서 자체적으로 덮어쓰고 싶은 규칙을 정의할 때 사용한다.
	// https://eslint.org/docs/rules/
	rules: {
		// prettier 에 맞게 룰을 설정
		"prettier/prettier": "error"
	},
};