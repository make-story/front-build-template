/**
 * manifest (빌드 결과물 정보) 파일 읽기
 */
const path = require('path'); 
const fs = require('fs');

const paths = require(path.resolve(__dirname, './paths'));
const config = require(path.resolve(__dirname, './index'));

// 경로 
const PATHS = {
	MANIFEST: path.resolve(__dirname, `../dist/${process.env.ACTIVE}/${process.env.BUILD}/manifest`),
};

// front 리소스 정보 불러오기 
module.exports = ({active=process.env.ACTIVE/*개발환경(local/test/stage/prodction)*/, build=process.env.BUILD/*빌드번호*/, name=""/*webpack entry 또는 gulp 빌드 key*/}={}) => {
	let filepath = "";
	let data = null;
	
	// 개발환경 구분
	switch(active) {
		case config.phase.local:
		case config.phase.development:
		case config.phase.production:
			// 파일 지정	
			//filepath = path.resolve(__dirname, `../dist/${active}/${build}/manifest/${name}.json`);	
			filepath = path.join(PATHS.MANIFEST, `/${name}.json`);	
			// 전체 
			//filepath = path.resolve(__dirname, `../dist/${active}/${build}/webpack/manifest.json`);
			if(fs.existsSync(filepath)) {
				data = fs.readFileSync(filepath);
			}
			if(data) {
				data = JSON.parse(data);
			}
			if(!data || typeof data !== 'object') {
				data = {};
			}
			//data.manifestFilePath = filepath;
			break;
	}

	console.log('[manifest-read] filepath', filepath);
	console.log('[manifest-read] data', data);
	return data;
};