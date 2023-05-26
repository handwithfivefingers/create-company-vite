import { message } from 'antd'
import axios from '@/config/axios'
import AuthService from '@/service/AuthService'
import { AUTH, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from '../type/auth.type'
export const AuthUser = () => {
  return async (dispatch) => {
    dispatch({
      type: AUTH.AUTH_REQUEST,
    })
    try {
      const response = await axios.post('/auth')

      dispatch({
        type: AUTH.AUTH_SUCCESS,
        payload: {
          status: response.data.authenticate,
          role: response.data.role,
        },
      })
    } catch (error) {
      dispatch({
        type: AUTH.AUTH_FAILURE,
      })
    }
  }
}

export const AuthLoginWithEmail = (val) => {
  return async (dispatch) => {
    dispatchLoginRequest(dispatch)
    try {
      const resp = await AuthService.onLogin(val)
      if (resp.status === 200) {
        const { authenticate, data } = resp.data

        dispatchLoginSuccess(dispatch, { authenticate: authenticate, role: data.role })

        message.success('Login success')
      }
      return true
    } catch (err) {
      distpachLoginFailure(dispatch)
      message.error(err.response.data.message)
      return false
    }
  }
}

// export const AuthLoginWithPhone = (val) => {
//   return async (dispatch) => {
//     dispatchLoginRequest(dispatch)
//     try {
//       const resp = await AuthService.loginWithPhone(val)
//       if (resp.status === 200) {
//         const { authenticate, data } = resp.data
//         dispatchLoginSuccess(dispatch, { authenticate: authenticate, role: data.role })
//         message.success('Login success')
//       }
//     } catch (err) {
//       distpachLoginFailure(dispatch)
//       message.error(err.response.data.message)
//     }
//   }
// }

export const AuthRegister = (form) => {
  return async (dispatch) => {
    try {
      dispatchRegisterReq(dispatch)

      let resp = await AuthService.onRegister(form)

      if (resp.status === 200) {
        message.success(resp.data.message)
        distpachRegisterSuccess(dispatch, { role: resp.data.role, status: true })
      }
    } catch (error) {
      console.log(error)
      message.error(error.response.data.message)
      dispatchRegisterFailure(dispatch)
    }
  }
}

export const AuthLogout = () => async (dispatch) => {
  await axios.post('/logout')
  dispatch({
    type: AUTH_LOGOUT.SUCCESS,
    payload: {},
  })
}
const dispatchRegisterReq = (dispatch) => {
  dispatch({
    type: AUTH_REGISTER.REQUEST,
  })
}
const distpachRegisterSuccess = (dispatch, { status, role }) => {
  dispatch({
    type: AUTH_REGISTER.SUCCESS,
    payload: {
      status: true,
      role,
    },
  })
}
const dispatchRegisterFailure = (dispatch) => {
  dispatch({
    type: AUTH_REGISTER.FAILURE,
  })
}

const dispatchLoginSuccess = (dispatch, { authenticate, role }) => {
  return dispatch({
    type: AUTH_LOGIN.SUCCESS,
    payload: {
      status: authenticate,
      role: role,
    },
  })
}

const distpachLoginFailure = (dispatch) => {
  return dispatch({
    type: AUTH_LOGIN.FAILURE,
  })
}

const dispatchLoginRequest = (dispatch) => {
  return dispatch({
    type: AUTH_LOGIN.REQUEST,
  })
}

const loginSuccess = (value) => (dispatch) => {
  return dispatchLoginSuccess(dispatch, value)
}
export { loginSuccess }
