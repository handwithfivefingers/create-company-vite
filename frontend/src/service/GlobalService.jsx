import axios from '../config/axios'

const api_path = {
  fetchCareer: '/career',
  sendMail: '/sendmail',
  getProvince: '/service/province',
  getCareerCate: '/career_cate',
  getSingleCareerCate: '/career_cate',
}

const GlobalService = {
  fetchCareer: () => {
    return axios.get(api_path.fetchCareer)
  },
  sendMail: (form) => {
    return axios.post(api_path.sendMail, form)
  },
  /**
   * @code { Quận : Number }
   * @wards { Phường : Number }
   */
  getProvince: (params) => {
    return axios.get(api_path.getProvince, { params })
  },
  getCareerCategory: () => {
    return axios.get(api_path.getCareerCate)
  },
  getSingleCareerCategory: (id) => {
    return axios.get(api_path.getSingleCareerCate + '/' + id)
  },
  getListCareerByCategory: (params) => {
    return axios.post(api_path.getSingleCareerCate, params)
  },
}

export default GlobalService
