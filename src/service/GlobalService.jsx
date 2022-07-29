import axios from '../config/axios';

const api_path = {
	fetchCareer: '/nganhnghe',
	sendMail: '/sendmail',
	getProvince: '/service/province',
};

const GlobalService = {
	fetchCareer: () => {
		return axios.get(api_path.fetchCareer);
	},
	sendMail: (form) => {
		return axios.post(api_path.sendMail, form);
	},
	/**
	 * @code { Quận : Number }
	 * @wards { Phường : Number }
	 */
	getProvince: (params) => {
		return axios.get(api_path.getProvince, { params });
	},
};

export default GlobalService;
