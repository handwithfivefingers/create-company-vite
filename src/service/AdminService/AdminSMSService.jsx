import axios from '@/config/axios'

const api_path = {
  balance: '/admin/sms/balance',
}

const AdminSMSService = {
  getBalance: () => {
    return axios.get(api_path.balance)
  },
 
}

export default AdminSMSService
