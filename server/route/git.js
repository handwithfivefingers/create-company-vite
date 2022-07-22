const express = require('express');

const router = express.Router();

const secret = 'Hdme195';

const repo = '/usr/share/nginx/html/create-company-vite';

const crypto = require('crypto');

const exec = require('child_process').exec;

router.post('/pull', (req, res) => {
	try {
		let command = 'cd ' + repo + ' && git checkout -- . && git pull';
		console.log('running command: ' + command);
		exec(command);
	} catch (err) {
		console.log('git error', err);
	} finally {
		res.end();
	}
});

module.exports = router;
