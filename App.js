const express = require('express');

const env = require('dotenv');

const app = express();

const path = require('path');

const mongoose = require('mongoose');

const cors = require('cors');

const AppRouter = require('./server/route');

const fs = require('fs');
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
			'http://127.0.0.1:3000',
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

app.listen(RUNTIME_PORT, () => {
	// console.log(`Server is running in port ${RUNTIME_PORT}`);
	console.log(`Server is running`);

	// let error = fs.readFileSync(path.join(__dirname, 'uploads', 'logs', 'error.log'), 'utf8');
	// let out = fs.readFileSync(path.join(__dirname, 'uploads', 'logs', 'out.log'), 'utf8');
	// console.log(error, out);
});
