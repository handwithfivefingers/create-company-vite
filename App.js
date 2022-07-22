const express = require('express');

const env = require('dotenv');

const app = express();

const path = require('path');

const mongoose = require('mongoose');

const cors = require('cors');

const AppRouter = require('./server/route');

const secret = 'Hdme195';

const repo = '/usr/share/nginx/html/create-company-vite';

const crypto = require('crypto');

const exec = require('child_process').exec;

var cookieParser = require('cookie-parser');

const { task } = require('./server/controller/service/cronjob');

const { requireSignin } = require('./server/middleware');
env.config();

const { NODE_ENV, PORT, DEV_PORT } = process.env;

const RUNTIME_PORT = NODE_ENV === 'development' ? DEV_PORT || 3001 : PORT;

const mongoseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};

// DB
mongoose.connect(process.env.DATABASE_URL, mongoseOptions).then(() => {
	console.log('DB connected');
});

// middleware

app.use(express.json());
app.use(cookieParser());

//config cors
app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'http://localhost:3002',
			'http://localhost:3003',
			'https://app.thanhlapcongtyonline.vn',
		],
	})
);

global.__basedir = __dirname;

// Routes middleware

app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', AppRouter);

app.use('/robots.txt', (req, res) => {
	let robotFile = path.join(__dirname, 'uploads', 'robots.txt');
	res.sendFile(robotFile);
});

if (NODE_ENV !== 'development') {
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
}

// Handling 500
app.use((err, req, res, next) => {
	res.status(500).send({
		error: err.stack,
		message: 'Internal Server Error',
	});
});

// Cron running ;
if (process.env.NODE_ENV !== 'development') {
	task.start();
}

app.post('/gitpull', function (req, res) {
	req.on('data', function (chunk) {
		let sig = 'sha1=' + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

		// console.log('running command: ' + command);
		if (req.headers['x-hub-signature'] == sig) {
			let command = 'cd ' + repo + ' && git checkout -- . && git pull';
			console.log('running command: ' + command);
			exec(command);
		}
	});
	res.end();
});

app.listen(RUNTIME_PORT, () => {
	// console.log(`Server is running in port ${RUNTIME_PORT}`);
	console.log(`Server is running`);

	// let error = fs.readFileSync(path.join(__dirname, 'uploads', 'logs', 'error.log'), 'utf8');
	// let out = fs.readFileSync(path.join(__dirname, 'uploads', 'logs', 'out.log'), 'utf8');
	// console.log(error, out);
});
