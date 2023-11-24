import { PROVINCE } from '@/store/type/province.type';
const initState = {
	province: [],
};

export default function provinceReducer(state = initState, action) {
	switch (action.type) {
		case PROVINCE.SUCCESS:
			return { ...state, province: action.payload.data };
		case PROVINCE.FAILURE:
			return state;
		default:
			return initState;
	}
}
