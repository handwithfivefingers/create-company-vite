const { User } = require('../model');
const { successHandler, errHandler } = require('../response');

const fetchUser = async (req, res) => {
	try {
		const { page, ...condition } = req.body;
		let current_page = (parseInt(page) - 1) * PAGE_SIZE;

		let _user = await User.find({}).select('-hash_password').skip(current_page).limit(PAGE_SIZE).sort('-createdAt');

		let count = await User.countDocuments();

		return successHandler({ _user, count, current_page: page || 1 }, res);
	} catch (e) {
		console.log('fetchUser error');
		return errHandler(e, res);
	}
};

module.exports = {
	fetchUser,
};
