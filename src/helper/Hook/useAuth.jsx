import { AuthAPIS } from '@/store/actions/auth.actions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AuthService from '../../service/AuthService'
import { useAuthStore } from '../../store/reducer'

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
    onAuthenticateUser()
  }, [])
  
  return authReducer // status:true false, role: admin user
}

export { useAuth }
