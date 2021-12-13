/**
 * webpack 빌드 템플릿엔진
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
	 });
 }
 
 // 웹팩 설정 
 module.exports = {
	 entry: {
		 template: getTemplateFileList(pathTemplate)
	 },
 
	 // 모듈처리 방법 (로더 등)
	 // 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
	 module: {
		 rules: [
			 // 템플릿 관련 
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