import axios from '@/config/axios'

const api_path = {
  transaction: '/admin/transaction',
}

const AdminTransactionService = {
  getTransaction: (query) => axios.get(api_path.transaction + '?' + query),
  updateTransaction: ({ _id, ...params }) => axios.post(api_path.transaction + '/' + _id, params),
}

export default AdminTransactionService
