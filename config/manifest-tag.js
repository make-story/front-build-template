/**
 * manifest (빌드 결과물 정보) 기반 html tag 생성
 */
const path = require('path'); 
const fs = require('fs');

const paths = require(path.resolve(__dirname, './paths'));
const manifestRead = require(path.resolve(paths.appPath, 'config/manifest-read'));

// link rel="stylesheet" 태그 생성
const getTagCSS = manifest => {
	let arr = [];
	if(!Array.isArray(manifest.css)) {
		return '';
	}
	manifest.css.forEach(function(src) {
		arr.push(`<link rel="stylesheet" href="${manifest.path}${src}"></link>`);
	});
	return arr.join('');
};

// script 태그 생성
const getTagJS = manifest => {
	let arr = [];
	if(!Array.isArray(manifest.js)) {
		return '';
	}
	manifest.js.forEach(function(src) {
		arr.push(`<script src="/${manifest.path}${src}"></script>`);
	});
	return arr.join('');
};

// tag 반환
const getTag = type => ({ manifest={}, name="" }) => {
	let tag = "";
	if(name) {
		manifest = manifestRead({ name });
	}
	switch(type) {
		case "css":
			tag = getTagCSS(manifest);
			break;
		case "js":
			tag = getTagJS(manifest)
			break;
	}
	return tag;
};

module.exports = {
	css: getTag("css"),
	js: getTag("js"),
};