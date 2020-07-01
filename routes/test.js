const path = require('path'); 
const express = require('express');
const router = express.Router();

const paths = require('../config/paths');
const env = require(path.resolve(paths.appPath, 'config/env'));
const manifestRead = require(path.resolve(paths.appPath, 'config/manifest-read'));
const manifestTag = require(path.resolve(paths.appPath, 'config/manifest-tag'));
let test = manifestRead({name: 'test'});

router.get('/', (req, res) => {
	res.render('pages/test.ejs', {
		"title": "test",
		"url": test.path,
		"css": manifestTag.css({ manifest: test }),
		"js": manifestTag.js({ manifest: test }),
	});
});

module.exports = router;
