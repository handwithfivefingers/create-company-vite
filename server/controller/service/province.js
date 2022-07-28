const fs = require('fs');
const path = require('path');

const getProvince = async (req, res) => {
	try {
		let _province = fs.readFileSync(path.join(global.__basedir, 'uploads', 'mockdata', 'province.json'));

		let province = JSON.parse(_province);

		let data = [];

		let { code, wards } = req.query;

		if (code) {
			data = await getDistrict(province, code);
		} else {
			data = province.map(({ districts, ...item }) => ({ ...item }));
		}
		data = province;

		return res.status(200).json({
			data,
		});
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
};

const getDistrict = (data, code) => {
	let result = [];
	result = data.filter((item) => item.code == code)[0].districts.map(({ wards, ...item }) => ({ ...item }));
	return result;
};

const getWards = (data) => {};

module.exports = { getProvince };
