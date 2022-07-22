const express = require('express');

const router = express.Router();

const secret = 'Hdme195';

const repo = '/usr/share/nginx/html/create-company-vite';

const exec = require('child_process').execSync;

router.post('/pull', (req, res) => {
	if (process.env.NODE_ENV === 'development') return;

	try {
		// let command = 'cd ' + repo + '\ && git checkout -- . \ && git pull';
		res.end();
		let cd = 'cd ' + repo;
		// let cd = 'node -v';
		let checkout = 'git checkout -- .';
		let pullCode = 'git pull';
		let buildPackage = 'npm run build';
		let restartPm2 = 'pm2 reload ecosystem.config.js';
		console.log('command ---> ' + cd);
		exec(cd);
		console.log('command ---> ' + checkout);
		exec(checkout);
		console.log('command ---> ' + pullCode);
		exec(pullCode);
		console.log('command ---> ' + buildPackage);
		exec(buildPackage);
		console.log('command ---> ' + restartPm2);
		exec(restartPm2);
		console.log('Done');
	} catch (err) {
		console.log('git error', err);
		res.end();
	}
});

module.exports = router;
