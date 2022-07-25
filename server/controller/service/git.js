const exec = require('child_process').execSync;
const crypto = require('crypto');
const sigHeaderName = 'X-Hub-Signature-256';
const sigHashAlg = 'sha256';
const secret = 'Hdme195';
const repo = '/usr/share/nginx/html/create-company-vite';

const gitAction = async (req, res) => {
	if (process.env.NODE_ENV === 'development') return;

	try {
		// let command = 'cd ' + repo + '\ && git checkout -- . \ && git pull';
		res.end();

		let isValid = await validateGit(req, res);

		if (!isValid) return;

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

		console.log('Done');

		console.log('command ---> ' + restartPm2);

		exec(restartPm2);
	} catch (err) {
		console.log('git error', err);
		res.end();
	}
};

const validateGit = async (req, res) => {
	let result = false;

	console.log(req.rawBody);
	console.log(req.body);

	if (!req.rawBody) {
		result = false;
	}

	const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8');
	const hmac = crypto.createHmac(sigHashAlg, secret);
	const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8');

	if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
		console.log(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`);
		result = false;
	}

	return result;
};

module.exports = { gitAction };
