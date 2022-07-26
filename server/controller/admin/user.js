const { User } = require('../../model');
const { successHandler, errHandler, deletedHandler } = require('../../response');
const PAGE_SIZE = 10;
exports.fetchUser = async (req, res) => {
	try {
		const { page, ...condition } = req.body;

		let current_page = (parseInt(page) - 1) * PAGE_SIZE;

		let _user = await User.find({}).select('-hash_password').skip(current_page).limit(PAGE_SIZE).sort('-createdAt');

		let count = await User.countDocuments();

		return successHandler({ _user, count, current_page: page || 1 }, res);
	} catch (e) {
		return errHandler(e, res);
	}
};

exports.deleteUser = async (req, res) => {
	let { id } = req.params;

	try {
		let _user = await User.findOneAndDelete({ _id: id });
		if (_user) return deletedHandler(_user, res);
	} catch (err) {
		console.log(err);
		return errHandler(err, res);
	}
};
