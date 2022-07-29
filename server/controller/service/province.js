const { findNestedObj } = require('../../common/helper');
const PROVINCE = require('../../../uploads/mockdata/province.json');

const getProvince = async (req, res) => {
	try {
		let data = [];

		let { code, wards } = req.query;

		let log = findNestedObj(PROVINCE, { keyToFind: 'codename', valToFind: 'xa_yen_trung' });

		let districts = await getDistrict({ data: PROVINCE, code, wards: !wards });

		let ward = (districts && (await getWards({ data: districts, code: wards }))) || [];

		data = ward;

		return res.status(200).json({
			data,
			// log,
		});
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
};

const getDistrict = ({ data, code = null, wards = null } = {}) => {
	if (!code) return data;

	let result = [];

	let [district] = data?.filter((item) => item.code == code);

	result = district && district.districts;

	if (wards) {
		result = result?.map(({ wards, ...item }) => ({ ...item }));
	}

	return result;
};

const getWards = ({ data, code }) => {
	if (!code) return data;

	let result = [];

	let [ward] = data?.filter((item) => item.code == code);

	result = ward && ward.wards;

	return result;
};

module.exports = { getProvince };
