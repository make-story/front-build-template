const path = require('path'); 
const express = require('express');
const router = express.Router();

// env
const env = require(path.resolve(__dirname, '../config/env'));
const paths = require(path.resolve(__dirname, '../config/paths'));

// build manifest
const manifestRead = require(path.resolve(__dirname, '../config/manifest-read'));
const manifestTag = require(path.resolve(__dirname, '../config/manifest-tag'));
const manifest = {
	// library: manifestRead({name: 'library'}),
	// basics: manifestRead({name: 'basics'}),
	// context: manifestRead({name: 'context'}),
	// todo: manifestRead({name: 'todo'}),
	// vanillaRedux: manifestRead({name: 'vanillaRedux'}),
	// redux: manifestRead({name: 'redux'}),
	// reduxMiddleware: manifestRead({name: 'reduxMiddleware'}),
	// reduxThunk: manifestRead({name: 'reduxThunk'}),
	// news: manifestRead({name: 'news'}),
	test: manifestRead({name: 'test'}),
};

// SPA 방식에 따라 JavaScript 내부 라우트가 설정되어 있을 수 있으므로 '*' 로 설정
router.get('*', (request, response) => {
	const css = {
		test: manifestTag.css({ manifest: manifest.test }),
	};
	const js = {
		test: manifestTag.js({ manifest: manifest.test }),
	};
	response.render('test.ejs', {
		"title": "test",
		"url": manifest.test.path,
		"css": css,
		"js": js,
	});
});

module.exports = router;
