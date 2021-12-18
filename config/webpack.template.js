/**
 * 템플릿엔진
 * $ yarn add handlebars handlebars-loader
 * $ yarn add ejs ejs-compiled-loader
 * $ yarn add nunjucks simple-nunjucks-loader
 */
const path = require('path'); 
const fs = require('fs');
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

// 경로
const pathTemplate = path.resolve(__dirname, `../templates`); // 템플릿 경로
const pathHtml = path.resolve(__dirname, `../html`); // html 파일 빌드 경로

// 템플릿 파일 목록 가져오기
function getTemplateFileList(path, extension='njk') {
	const pattern = `${path}/**/*.${extension}`;
	const options = {};
	return glob.sync(pattern, options);
}

// 템플릿 파일 목록 -> HtmlWebpackPlugin 세팅
function setHtmlWebpackPlugin(template) {
	const dirname = path.dirname(template).replace(pathTemplate, pathHtml); // 빌드 경로
	const basename = path.basename(template).split('.').shift(); // 확장자를 제외한 순수 파일명
	return new HtmlWebpackPlugin({
		template: template,
		filename: `${dirname}/${basename}.html`,

		// 기타 옵션
		inject: false, // 코드 삽입 - true || 'head' || 'body' || false
		minify: false, // 코드 압축여부
		showErrors: true, // 에러 발생시 메세지가 브라우저 화면에 노출 된다.
	});
}
 
// 웹팩 설정 
module.exports = {
	cache: false,

	entry: {
		template: getTemplateFileList(pathTemplate)
	},

	// 모듈처리 방법 (로더 등)
	// 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
	module: {
		rules: [
			// 템플릿 관련 
			{
				test: /\.handlebars$/, 
				loader: "handlebars-loader", // npm install --save handlebars-loader
				//loader: "handlebars-loader?runtime=handlebars/runtime", 
				//loader: "handlebars-template-loader", // npm install --save handlebars-template-loader
				//loader: "cjos-handlebars-loader"
				options: {
					// 런타임 라이브러리의 경로
					//runtime: 'handlebars',
					// 확장자명 (기본값 .handlebars, .hbs)
					//extensions : '',
					// 디버그
					debug: true,
					// https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options
					precompileOptions: {
						knownHelpersOnly: false
					},
					//
					//ignorePartials: true,
					//ignoreHelpers: true,
					//partialDirs: [],
					helperDirs: [
						// handlebars 기본 제공 헬퍼 외 사용자가 등록한 추가 헬퍼들이 있는 경로 (기본적으로 handlebars-loader 는 .handlebars 템플릿이 있는 경로에서 템플릿에서 사용된 .js 헬퍼 파일을 검색한다.)
						path.resolve(__dirname, "../src/helper")
					], 
					/*partialResolver: function(partial, callback) {
						console.log('partialResolver');
						console.log('partial', partial);
						console.log('callback', callback);
						callback();
					},*/
					/*helperResolver: (helper, callback) => {
						console.log('helperResolver');
						console.log('helper', helper);
						console.log('callback', callback);
						switch(helper) {
							case 'date':
								//callback(null, path.resolve('node_modules/helper-date'));
								break;
							default:
								callback();
						}
					},*/
				}
			},
			{
				test: /\.ejs$/, 
				exclude: /node_modules/, // 제외
					use: {
						loader: "ejs-compiled-loader", // ejs-loader 은 <%-include ... %> 작동안함, ejs-compiled-loader 사용
						options: {}
					}
				},
			{
				test: /\.njk$/,
				use: [
					{
						loader: "simple-nunjucks-loader",
						options: {
							searchPaths: [
								pathTemplate
							],
						},
					},
				],
			},
			/*{
				test: /\.html$/,
				exclude: [/node_modules/], // 제외
				use: {
					loader: "file-loader", // npm install --save ejs-loader ejs-webpack-loader
					options: {
						name: '[name].[ext]'
					},
				}
			},*/
		]
	},

	// 플러그인
	plugins: [
		...getTemplateFileList(pathTemplate).map(setHtmlWebpackPlugin)
	],
};