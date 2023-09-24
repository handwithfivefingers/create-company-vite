import axios from '../../config/axios'

const api_path = {
  transaction: '/transaction',
}

const TransactionService = {
  getTransaction: () => axios.get(api_path.transaction),
}

export default TransactionService
