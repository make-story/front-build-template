/**
 * 타입스크립트
 * $ yarn add typescript ts-loader 
 * $ yarn add @babel/preset-typescript
 */
const path = require('path'); 

module.exports = {
	entry: {
		'typescript': 'src/typescript/test.ts',
	},
	
	// 모듈처리 방법 (로더 등)
	// 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
	module: {
		rules: [
			// Typescript
			// https://github.com/TypeStrong/ts-loader
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
};