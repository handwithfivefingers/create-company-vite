import GlobalService from '@/service/GlobalService';
import { PROVINCE } from '@/store/type/province.type';

const getProvinceAction = (params) => async (dispatch) => {
	try {
		let res = await GlobalService.getProvince(params);
		let { data } = res.data;
		dispatch({
			type: PROVINCE.SUCCESS,
			payload: {
				data,
			},
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: PROVINCE.FAILURE,
		});
	}
};

export { getProvinceAction };
