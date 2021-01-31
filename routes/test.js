const path = require('path'); 
const express = require('express');
const router = express.Router();

const paths = require('../config/paths');
const env = require(path.resolve(paths.appPath, 'config/env'));
const manifestRead = require(path.resolve(paths.appPath, 'config/manifest-read'));
const manifestTag = require(path.resolve(paths.appPath, 'config/manifest-tag'));

/*let library = manifestRead({name: 'library'});
let basics = manifestRead({name: 'basics'});
let context = manifestRead({name: 'context'});
let todo = manifestRead({name: 'todo'});
let vanillaRedux = manifestRead({name: 'vanilla-redux'});
let redux = manifestRead({name: 'redux'});
let reduxMiddleware = manifestRead({name: 'redux-middleware'});
let reduxThunk = manifestRead({name: 'redux-thunk'});
let news = manifestRead({name: 'news'});*/
let test = manifestRead({name: 'test'});

// SPA 방식에 따라 JavaScript 내부 라우트가 설정되어 있을 수 있으므로 '*' 로 설정
router.get('*', (request, response) => {
	const css = {
		test: manifestTag.css({ manifest: test }),
	};
	const js = {
		test: manifestTag.js({ manifest: test }),
	};
	response.render('pages/test.ejs', {
		"title": "test",
		"url": test.path,
		"css": css,
		"js": js,
	});
});

module.exports = router;
