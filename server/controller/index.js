const auth = require('./auth');
const career = require('./career');
const category = require('./category');
const order = require('./order');
const product = require('./product');
const sendmail = require('./sendmail');
const setting = require('./setting');
const user = require('./user');

module.exports = {
	...auth,
	...career,
	...category,
	...order,
	...product,
	...sendmail,
	...setting,
	...user,
};
