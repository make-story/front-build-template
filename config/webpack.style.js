/**
 * Style (SCSS, CSS 등)
 * $ yarn add mini-css-extract-plugin 
 * $ yarn add css-loader style-loader 
 * $ yarn add sass-loader vue-style-loader
 */
const path = require('path'); 

// webpack plugin 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 웹팩4 부터는 extract-text-webpack-plugin 을 CSS에 사용해서는 안됩니다. 대신 mini-css-extract-plugin을 사용, 'TypeError: MiniCssExtractPlugin is not a constructor' 에러가 발생할 경우 '2.4.5' 다운그레이드

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
    // 모듈처리 방법 (로더 등)
    // 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
    module: {
        rules: [
            // 스타일 관련 
			{
				test: /\.scss$/, // npm install --save--dev node-sass style-loader css-loader sass-loader
				//include: path.join(__dirname),
				exclude: /node_modules/,
				use: [
					// 배열의 마지막 로더부터 실행된다.
					//"style-loader", // Creates `style` nodes from JS strings
					//(process.env.NODE_ENV || process.env.ACTIVE) !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // MiniCssExtractPlugin
					MiniCssExtractPlugin.loader,
					"css-loader", // Translates CSS into CommonJS
					{
						loader: "sass-loader", // Compiles Sass to CSS
						/*sourceMap: true,
            			sassOptions: {
							outputStyle: 'compressed',
						},*/
					}
				]
			},
			// CSS 관련 로더
			{
				test: /\.css$/,
				include: /\.module\.css$/, // CSS 모듈 전용 - 파일명.module.css 규칙 파일
				use: [
					// 배열의 마지막 로더부터 실행된다.
					'style-loader',
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true
						}
					}
				],
			},
			// CSS 외부 파일로 생성 - CSS 위 로더 실행 후 실행
			{
				test: /\.css$/,
				exclude: /\.module\.css$/, // 제외할 폴더나 파일
				use: [
					// 배열의 마지막 로더부터 실행된다.
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						/*options: {
							modules: true,
							localIdentName: "[name]__[local]"
						},*/
					}
				],
			},
        ]
    },

	// 부가적인 기능
	// 번들링 완료 후 마지막 output 과정에 개입 (번들링된 파일을 처리하는 단위)
	// 웹팩4 에서는 ModuleConcatenationPlugin, UglifyJsPlugin, NoEmitOnErrorsPlugin, NamedModules 플러그인이 모두 사라지고 optimization 속성(속성내부 설정)으로 대치
	// 웹팩3 에서 DedupePlugin (중복 종속 제거) 은 사라졌고, OccurrenceOrderPlugin (청크 [id]를 생성하기 위한 플러그인)은 기본으로 설정되어 있음
	plugins: [
		// 번들링한 결과물에서 css파일을 따로 추출
		new MiniCssExtractPlugin({
			// 개발모드 
			//filename: '[name].css',
			//chunkFilename: '[id].css',
			// 운영모드
			filename: '[name]/[name].[hash].css',
			chunkFilename: '[name]/[id].[hash].css',
		}),
	]
};