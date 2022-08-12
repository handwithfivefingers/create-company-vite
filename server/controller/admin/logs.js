const { errHandler, successHandler } = require('../../response');
const { Log } = require('../../model');
const fs = require('fs');
const path = require('path');

const getLogs = async (req, res) => {
	// console.log('coming here')
	try {
		let _logs = await Log.find({}).sort('-createdAt');
		let errorPath = path.join(global.__basedir, 'uploads', 'logs', 'error.log');
		let outPath = path.join(global.__basedir, 'uploads', 'logs', 'out.log');
		let pidPath = path.join(global.__basedir, 'uploads', 'logs', 'pid.pid');
		let error = [];
		let output = [];
		let pidOutput = [];
		if (fs.existsSync(errorPath)) {
			let err = fs.readFileSync(errorPath, 'utf8');
			error = err
				.split('CC_LOGS :::')
				.reverse()
				.filter((item) => item !== '');
		}
		if (fs.existsSync(errorPath)) {
			let out = fs.readFileSync(outPath, 'utf8');
			output = out
				.split('CC_LOGS :::')
				.reverse()
				.filter((item) => item !== '');
		}

		// console.log(':::::::::::::::' , output)
		if (_logs) {
			return successHandler({ _logs, error, output, pidOutput }, res);
		} else {
			return errHandler(_logs, res);
		}
	} catch (err) {
		console.log('getLogs error', err);
		return errHandler(err, res);
	}
};

module.exports = { getLogs };
