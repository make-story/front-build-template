# Front 작업 환경  
### `Typescript`, `React`, `Vue`, `Jenkins Build/Restart` 대응
### ESLint (문법 검사 도구), Prettier (코드 스타일 자동 정리 도구)

> Create App - 프론트엔드 빌드 설정 생성기  
https://createapp.dev/  

-----

> 프론트 리소스 빌드과정  
webpack 빌드 -> 빌드결과(경로, 파일명 등 정보) JSON 생성 -> 리소스 정보 JSON 읽어서 태그생성  

> Node.js 정리문서  
http://makestory.net/media/#/view/475  
  
> 쉘 스크립트 정리문서  
http://makestory.net/media/#/view/485  
    
> 젠킨스 연동 정리문서  
http://makestory.net/media/#/view/603  
  
> 도커 정리문서  
http://makestory.net/media/#/view/540  
  
> Git 정리문서  
http://makestory.net/media/#/view/321  

-----

## React + Typescript
```
$ yran add react react-dom  
$ yran add typescript ts-loader
$ yarn add babel-loader @babel/preset-env @babel/preset-typescript @babel/preset-react 
$ yarn add @types/react @types/react-dom 
```

### .babelrc 또는 webpack.config.js 설정   
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

### tsconfig.json 설정 
```json
{
  "compilerOptions": {
    "sourceMap": true,  // 소스맵(*.map) 파일 생성 여부
    "jsx": "react"  // Resolve: Cannot use JSX unless '--jsx' flag is provided
  }
}
```

-----

