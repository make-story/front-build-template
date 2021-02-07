/*
-
Prettier 설치 
https://prettier.io/docs/en/integrating-with-linters.html
https://prettier.io/docs/en/configuration.html
https://prettier.io/docs/en/options.html
$ npm install -D prettier 

ESLint + Prettier 함께 사용 (typescript-eslint + prettier 함께 사용)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html
$ npm install -D eslint-plugin-prettier eslint-config-prettier

> plugin이나 config 중 하나만을 사용할 수도 있다
	plugin만 사용: 포맷 관련 오류가 두 번 출력된다(eslint + prettier)
	config만 사용: eslint에서 포맷 관련 오류가 출력되지 않는다
plugin 사용만으로는 eslint formatting rules와 prettier rules가 충돌하므로, eslint-config-prettier를 함께 사용한다 
(공식문서에서도 둘을 함께 사용하기를 권장한다)
*/
module.exports = {
	trailingComma: "es5",
	tabWidth: 4,
	semi: false,
	singleQuote: false,
	//printWidth: 100,
	//singleQuote: true,
};