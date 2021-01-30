
module.exports = {
	// 웹팩이 파일을 읽어들이기 시작하는 부분
	// 서로간 의존성이 없는 여러개의 파일을 사용하고 싶다면 Array 형식으로 사용 
	// 여러 entry 를 사용(여러 페이지)한다면 Object 
	entry: {
		// IE 환경에서 최신 자바스크립트를 사용해 개발하고 싶다면 두 폴리필을 npm에서 다운 받은 후 저렇게 모든 엔트리에 넣어주셔야 합니다. ('@babel/polyfill', 'eventsource-polyfill')
		//'test': ['@babel/polyfill', 'eventsource-polyfill', 'src/javascript/entry.js'],
		//'module2': 'src/javascript/module2.js',
		//'circular': 'src/javascript/index.js', // 순환 종속 테스트 
		'test': 'src/javascript/entry.js',
	},
};