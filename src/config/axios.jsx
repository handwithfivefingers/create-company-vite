import axios from 'axios'
import store from '@/store'
import { AuthAction } from '@/store/actions'

const instance = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_BASEHOST_DEV}/api` : `${import.meta.env.VITE_BASEHOST_PROD}/api`,
  timeout: 1000 * 30, // Wait for 30 seconds
  headers: {
    'Access-Control-Allow-Origin': '*',
    accept: 'application/json',
  },
  withCredentials: true,
  credentials: 'include',
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log('request error', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(AuthAction.AuthLogout())
    }
    return Promise.reject(err)
  },
)

export default instance
