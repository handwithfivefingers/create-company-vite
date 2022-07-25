const { Career } = require('./../model');
const {
	updatedHandler,
	errHandler,
	successHandler,
	createdHandler,
	existHandler,
	deletedHandler,
} = require('../response');

const createCareer = async (req, res) => {
	try {
		const career = await Career.findOne({
			code: req.body.code,
		});

		if (career) return existHandler(career, res);

		const obj = {
			name: req.body.name,
			code: req.body.code,
		};

		const _career = new Career(obj);
		const data = await _career.save();

		return createdHandler(data, res);
	} catch (err) {
		return errHandler(err, res);
	}
};

const fetchCareer = async (req, res) => {
	try {
		let _career = await Career.find();
		return successHandler(_career, res);
	} catch (err) {
		return errHandler(err, res);
	}
};

const editCareer = async (req, res) => {
	try {
		let { id } = req.params;

		const _update = {
			name: req.body.name,
			code: req.body.code,
		};

		let _updated = await Career.updateOne({ _id: id }, _update, { new: true });
		return updatedHandler(_updated, res);
	} catch (e) {
		console.log('editCareer error');
		return errHandler(e, res);
	}
};

const deleteCareer = async (req, res) => {
	try {
		let { id } = req.params;

		await Career.findOneAndDelete({ _id: id });

		return deletedHandler('', res);
	} catch (e) {
		console.log('deleteCareer error');
		return errHandler(e, res);
	}
};

module.exports = {
	createCareer,
	fetchCareer,
	editCareer,
	deleteCareer,
};
