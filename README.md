# 프론트 빌드 템플릿
## `React`, `Vue`, `Typescript`, `Jenkins Build/Restart` 대응
## ESLint (문법 검사 도구), Prettier (코드 스타일 자동 정리 도구)

> Create App - 프론트엔드 빌드 설정 생성기  
https://createapp.dev/  

-----

> 프론트 리소스 빌드과정  
webpack 빌드 -> 빌드결과(경로, 파일명 등 정보) JSON 생성 -> 리소스 정보 JSON 읽어서 태그생성  

> Node.js 정리문서  
http://makestory.net/media/#/view/475  

> Webpack 정리문서  
http://makestory.net/media/#/view/454  

> Babel 정리문서  
http://makestory.net/media/#/view/477  
https://github.com/make-story/study/blob/master/Babel.md  
  
> 쉘 스크립트 정리문서  
http://makestory.net/media/#/view/485  
    
> 젠킨스 연동 정리문서  
http://makestory.net/media/#/view/603  
  
> 도커 정리문서  
http://makestory.net/media/#/view/540  
  
> Git 정리문서  
http://makestory.net/media/#/view/321  

-----

## Webpack 4.x 와 5.x 이상 버전간 차이 있음
- ts-loader : 8.x (webpack4)  
- 기존 플러그인, 로더 등 설치형으로 사용하던 것들이 웹팩 기본으로 제공하는 것에 대한 확인필요  

-----

## Vue
```
$ yarn add vue@2.6.11 vue-template-compiler@2.6.11 vue-loader
$ yarn add vuex@3.4.0 vue-router@3.3.2
```
- vue-template-comfiler의 버전와 vue의 버전은 항상 일치 시켜야 함  

webpack.config.js
```javascript 
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	// ...
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
		}],
	},
	plugins: [
		new VueLoaderPlugin(),
	],
	// ...
};
```

-----

## React + Typescript
```
$ yran add react react-dom  
$ yran add typescript ts-loader
$ yarn add babel-loader @babel/preset-env @babel/preset-typescript @babel/preset-react 
$ yarn add @types/react @types/react-dom 
```

## babel
```
yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```
@babel/preset-env : ES5+ 를 변환할 때 사용한다.  
@babel/preset-react : React 를 변환할 때 사용한다.  
@babel/preset-typescript : Typescript 를 변환할 때 사용한다.  
@babel/runtime  
@babel/plugin-transform-runtime   

> Babel 7.4.0부터 @babel/polyfill은 deprecated 되었다.  
https://poiemaweb.com/babel-polyfill  

### .babelrc 
(webpack 에 babel presets 설정이 있고, .babelrc 파일에도 presets 설정이 있다면, .babelrc 파일이 우선순위를 가짐)
```json
{
	"presets": [
		"@babel/preset-env",
		"@babel/preset-typescript",
		"@babel/preset-react"
	]
}
```

## webpack.config.js 

```javascript
module.exports = {
	// ...
    resolve: {
		modules: [
			'node_modules',
			path.join(__dirname, 'src'),
		],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
	},
	module: {
		rules: [
			{ 
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript',
							'@babel/preset-react',
						] 
					},
				},
			},
			{
				test: /\.(ts|tsx)$/, // TypeScript 를 사용 할때는 .ts (리액트 컴포넌트의 경우에는 .tsx) 확장자를 사용
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					},
				],
			},
		]
	},
	// ...
};
```

## typescript
> tsc 명령 전역 실행
```
$ yarn global add typescript@4.1.3
$ tsc
```

> tsc 명령 지역 실행
```
$ yarn global typescript@4.1.3
$ ./node_modules/.bin/tsc
```

> tsconfig.json 설정 
```json
{
  "compilerOptions": {
    "sourceMap": true,  // 소스맵(*.map) 파일 생성 여부
    "jsx": "react"  // Resolve: Cannot use JSX unless '--jsx' flag is provided
  }
}
```

-----

