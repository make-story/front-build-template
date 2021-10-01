// ejs 파일 -> html 빌드
const path = require('path'); 
const fs = require('fs');
const webpack = require('webpack');

// webpack plugin 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // dev server 사용시 test html 생성
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 웹팩 설정 
module.exports = {
	// webpack mode: 'none' | 'development' | 'production'
	mode: 'production',

	// devtool
	//devtool: process.env.NODE_ENV === 'development' ? "inline-source-map" : "source-map",
	//devtool: 'inline-source-map',
	devtool : "source-map",

	// entry, 로더를 해석하기 위한 기본 경로인 절대 경로
	// [중요!] context 경로에 따라, entry, resolve.modules 경로 기준이 된다.
	//context: path.resolve(__dirname, '../'),

	// 웹팩이 파일을 읽어들이기 시작하는 부분
	// 서로간 의존성이 없는 여러개의 파일을 사용하고 싶다면 Array 형식으로 사용 
	// 여러 entry 를 사용(여러 페이지)한다면 Object 
	entry: {
		'index': 'src/template/index.js',
	},

	// 경로나 확장자를 처리할 수 있게 도와주는 옵션
	// 모듈로딩 관련 옵션 설정, 모듈 해석방식 정의 (alias등)
	resolve: {
		// 모듈 탐색을 시작할 경로 지정, require 나 import 했을 때 시작 경로 (default: 'node_modules/')
		// context 경로 기준으로 경로 설정
		modules: [
			// 'node_modules' 경로 필수
			path.resolve(__dirname, '../node_modules'), 
			path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../'),
		],

		// 탐색할 모듈의 확장자를 지정  
		// 종속 파일 검색할 때 - import * from './index'; 확장자 검색 항목 
		extensions: ['.mjs', '.js', '.json'],

		// alias
		// key 가 모듈이름이 되는 객체를 만듭니다. value 는 모듈 경로입니다. (정규식)
		// ProvidePlugin 연동
		// 타입스크립트 환경에서 해당 설정을 사용할 경우, tsconfig 에도 같은 설정을 해줘야 함 (baseUrl, paths)
		alias: {
			'@src': path.resolve(__dirname, '../src'), // import '@/components/button';
		},

		// 활성화되면 심볼릭 링크 된 리소스는 심볼릭 링크 된 위치가 아닌 실제 경로 로 확인
		symlinks: false,
	},

	// 모듈처리 방법 (로더 등)
	// 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
	module: {
		//noParse: /jquery|lodash/,

		// 누락 된 내보내기를 경고 대신 오류
		strictExportPresence: true, 

		// rules나 use 대신 loaders를 쓰고, options 대신 query를 쓰면, 웹팩1
		/*loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				}
			}
		]*/
		// 웹팩2 이상 
		rules: [
			// 템플릿 관련 
			{
				test: /\.handlebars$/, 
				loader: "handlebars-loader", // npm install --save handlebars-loader
				//loader: "handlebars-loader?runtime=handlebars/runtime", 
				//loader: "handlebars-template-loader", // npm install --save handlebars-template-loader
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
				test: /\.ejs$/, // https://github.com/difelice/ejs-loader
				exclude: /node_modules/, // 제외
				use: {
					loader: "ejs-compiled-loader", // ejs-loader 은 <%-include ... %> 작동안함, ejs-compiled-loader 사용
					options: {}
				}
			},
            {
				test: /\.html$/,
				exclude: [/node_modules/], // 제외
				use: {
					loader: "file-loader", // npm install --save ejs-loader ejs-webpack-loader
                    options: {
                        name: '[name].[ext]'
                    },
				}
			},
			// 자바스크립트 관련 (트랜스파일러 등)
			/*{
				test: /\.js$/,
				exclude: /node_modules|dist/,
				loader: 'eslint-loader',
				enforce: 'pre',
				options: {
					configFile: './.eslintrc.js',
					failOnWarning: false,
					failOnError: false
				}
			},*/
			{
				test: /\.js?$/,
				//test: /\.(js|mjs|jsx|ts|tsx)$/,
				//include: path.join(__dirname), // 대상
				exclude: /node_modules/, // 제외
				use: {
					// .babelrc 있다면 해당 파일을 먼저 참조 하며, 없을 경우 webpack options 에 부여한 presets plugins 을 참조
					loader: 'babel-loader',  // npm install --save-dev babel-loader @babel/core @babel/preset-env 
					options: {
						// presets
						// @babel/preset-env를 설정하여, babel에서 미리 정의해둔 환경으로 ES6에서 ES5로 변환
						// @babel/preset-env은 함께 사용되어야 하는 Babel 플러그인을 모아 둔 것으로 Babel 프리셋이라고 부른다. 
						// Babel이 제공하는 공식 Babel 프리셋(Official Preset) : @babel/preset-env, @babel/preset-flow, @babel/preset-react, @babel/preset-typescript
						// @babel/preset-env도 공식 프리셋의 하나이며 필요한 플러그인 들을 프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다.
						//presets: ['@babel/preset-env'] 
						presets: [
							[
								"@babel/preset-env", 
								{
									// async / await 사용때문에 크롬버전 지정
									"targets": {"chrome": "55"}, // chrome 55 이상으로 지정 
									"debug": true
								},
							],
						],
						// plugins 
						// 다이나믹 import (System.import 는 더이상 사용되지 않습니다.)
						// import 방식이 require.ensure보다 더 좋습니다. (import 방식은 catch 를 활용해 에러가 났을 때 대처)
						//plugins: ['@babel/plugin-syntax-dynamic-import'], // npm i -D @babel/plugin-syntax-dynamic-import
					}
				}
			},
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

	// 결과
	// 파일이 저장될 경로
	output: {
		//pathinfo: false,

		// path 는 어디에 결과가 저장되는지 에 관한 것 
		path: path.resolve(__dirname, `../dist`), 
		
		// 파일들이 위치할 서버 상의 경로 
		publicPath: `./`,

		// [name]은 entry 에 설정된 ‘key’ 이름 - entry name
		// [id] 웹팩 내부적으로 사용하는 모듈 ID - chunk id
		// [hash]는 매번 웹팩 컴파일 시 랜덤한 문자열을 붙여줍니다. 해시 길이 지정가능 - [hash:16]
		// [hash]가 컴파일할 때마다 랜덤 문자열을 붙여준다면, 
		// [chunkhash]는 파일이 달라질 때에만 랜덤 값이 바뀝니다. (이것을 사용하면 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 새로 불러올 수 있습니다.)
		//filename: '[name].bundle.js',
		filename: '[name]/[name].[hash].js',
		chunkFilename: '[name]/[id].[chunkhash].js',

		// 빌드 결과물을 라이브러리 형태로 외부에서 사용가능하도록 설정 (externals 설정과 연동)
		/*
		-
		libraryTarget 설정값 종류
		"var" - 변수를 설정하여 내보내기 : var Library = xxx (기본)
		"this" - this를 설정하여 내보내기 : this[“Library”] = xxx
		"commonjs" - commonjs 속성을 사용하여 내보내기 : exports[“Library”] = xxx
		"commonjs2" - module.exports를 설정하여 내보내기 : module.exports = xxx
		"amd" - AMD로 내보내기 (옵션으로 설정 - 라이브러리 옵션을 통해 이름 설정)
		"umd" - AMD, CommonJS2로 내보내기 또는 루트의 등록 정보로 내보내기 | Default : “var” output.library가 설정되어 있지 않지만 output.libraryTarget이 var 이외의 값으로 설정된 경우 내보낸 객체의 모든 속성이 복사됩니다. (예외 and, commonjs2 및 umd)
		*/
		//libraryTarget: 'umd',
		//library: 'App',
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

		// html 생성
        new HtmlWebpackPlugin({
            title: 'Template',
            filename: 'index.html',
            template: path.resolve(__dirname, '../pages/template.ejs')
        }),
	],
};