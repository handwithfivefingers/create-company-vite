import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthAction } from '@/store/actions'

const useAuth = () => {
  const authReducer = useSelector((state) => state.authReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthAction.AuthUser())
  }, [])

  return authReducer // status:true false, role: admin user
}

export { useAuth }
