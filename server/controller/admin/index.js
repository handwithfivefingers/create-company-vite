const logs = require('./logs');

const order = require('./order');
const template = require('./template');

const user = require('./user');

module.exports = {
	...logs,
	...order,
	...template,
	...user,
};
