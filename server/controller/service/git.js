const exec = require('child_process').execSync;
const crypto = require('crypto');
const sigHeaderName = 'X-Hub-Signature-256';
const sigHashAlg = 'sha256';
const secret = 'Hdme195';
const repo = '/usr/share/nginx/html/create-company-vite';

const gitAction = async (req, res) => {
	// if (process.env.NODE_ENV === 'development') return res.end();

	try {
		// let command = 'cd ' + repo + '\ && git checkout -- . \ && git pull';

		let isValid = await validateGit(req);

		res.end();

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

const validateGit = async (req) => {
	let result = false;
	// const payload = JSON.stringify(req.body);
	// console.log('payload', payload);
	// if (!payload) {
	// 	result = false;
	// }

	// const sig = new Buffer.from(req.get(sigHeaderName) || '', 'utf8');

	// const hmac = crypto.createHmac(sigHashAlg, secret)

	// const digest = new Buffer.from(sigHashAlg + '=' + hmac.update(payload).digest('hex'), 'utf8');

	// if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
	// 	console.log(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`);

	// 	result = false;
	// }
	// const blob = JSON.stringify(req.body);
	// const hmac = crypto.createHmac('sha1', secret);
	// const ourSignature = `sha1=${hmac.update(blob).digest('hex')}`;

	// const theirSignature = req.get('X-Hub-Signature');

	// const bufferA = Buffer.from(ourSignature, 'utf8');
	// const bufferB = Buffer.from(theirSignature, 'utf8');

	// const safe = crypto.timingSafeEqual(bufferA, bufferB);

	// if (safe) {
	// 	console.log('Valid signature');
	// } else {
	// 	console.log('Invalid signature');
	// }

	const theirSignature = req.headers['x-hub-signature'];

	const payload = JSON.stringify(req.body);

	const ourSignature = `sha1=${crypto.createHmac('sha1', secret).update(payload).digest('hex')}`;
    
	console.log(theirSignature, ourSignature);

	if (crypto.timingSafeEqual(Buffer.from(theirSignature), Buffer.from(ourSignature))) {
		console.log('all good');
	} else {
		console.log('not good');
	}
	
	// result = false;

	return result;
};

module.exports = { gitAction };
