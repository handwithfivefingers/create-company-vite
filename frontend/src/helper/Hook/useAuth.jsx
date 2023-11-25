import { AuthAPIS } from '@/store/actions/auth.actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../service/AuthService'
import { useAuthStore } from '../../store/reducer'
import { notification } from 'antd'

const useAuth = () => {
  const authReducer = useAuthStore()
  const dispatch = useDispatch()
  const onAuthenticateUser = async () => {
    try {
      const resp = await AuthService.onAuthenticate()
      if (resp.status === 200) {
        dispatch(AuthAPIS.AuthUser(resp.data))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (!window.navigator?.onLine) {
      return notification.error({ message: 'Kết nối mạng không ổn định, vui lòng thử lại sau' })
    } else {
      onAuthenticateUser()
    }
  }, [])

  return authReducer // status:true false, role: admin user
}

export { useAuth }
