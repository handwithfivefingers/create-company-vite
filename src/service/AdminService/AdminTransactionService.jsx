import axios from '@/config/axios'

const api_path = {
  transaction: '/admin/transaction',
}

const AdminTransactionService = {
  getTransaction: (query) => axios.get(api_path.transaction + '?' + query),
}

export default AdminTransactionService
