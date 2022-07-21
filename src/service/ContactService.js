import axios from '../config/axios';


const api_path = {
  register: '/register'
}

const ContactService = {
  userRegister: (form) => {
    return axios.post(api_path.register, form);
  },
};

export default ContactService;
