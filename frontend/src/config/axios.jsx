import axios from 'axios'
import store from '@/store'
import { AuthAPIS } from '@/store/actions/auth.actions'
import { notification } from 'antd'
import AuthService from '../service/AuthService'
const instance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? `${import.meta.env.VITE_BASEHOST_DEV}/api/v1`
      : `${import.meta.env.VITE_BASEHOST_PROD}/api/v1`,
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
    // console.log('request error', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response?.status === 401 || err?.status === 401) {
      if (!window.navigator?.onLine) {
        notification.warn({ message: 'Đường truyền không ổn định, vui lòng kiểm tra lại đường truyền' })
      } else {
        AuthService.onLogout().finally(() => {
          console.log('Logout')
          store.dispatch(AuthAPIS.AuthLogout())
        })
      }
    }
    return Promise.reject(err)
  },
)

export default instance
