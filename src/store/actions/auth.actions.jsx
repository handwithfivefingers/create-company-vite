import { AUTH, AUTH_LOGOUT } from '../type/auth.type'

const AuthAPIS = {
  AuthUser: (data) => async (dispatch) => {
    dispatch({
      type: AUTH.AUTH_SUCCESS,
      payload: {
        status: data.authenticate,
        role: data.role,
      },
    })
  },
  AuthLogout: () => async (dispatch) => {
    dispatch({
      type: AUTH_LOGOUT.SUCCESS,
      payload: {},
    })
  },
}

export { AuthAPIS }

// export const AuthUser = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: AUTH.AUTH_REQUEST,
//     })
//     try {
//       const response = await axios.post('/auth')

//       dispatch({
//         type: AUTH.AUTH_SUCCESS,
//         payload: {
//           status: response.data.authenticate,
//           role: response.data.role,
//         },
//       })
//     } catch (error) {
//       dispatch({
//         type: AUTH.AUTH_FAILURE,
//       })
//     }
//   }
// }

// export const AuthLoginWithEmail = (val) => {
//   return async (dispatch) => {
//     dispatchLoginRequest(dispatch)
//     try {
//       const resp = await AuthService.onLogin(val)
//       if (resp.status === 200) {
//         const { authenticate, data } = resp.data

//         dispatchLoginSuccess(dispatch, { authenticate: authenticate, role: data.role })

//         message.success('Login success')
//       }
//       return true
//     } catch (err) {
//       distpachLoginFailure(dispatch)
//       message.error(err.response.data.message)
//       return false
//     }
//   }
// }

// export const AuthRegister = (form) => {
//   return async (dispatch) => {
//     try {
//       dispatchRegisterReq(dispatch)

//       let resp = await AuthService.onRegister(form)

//       if (resp.status === 200) {
//         message.success(resp.data.message)
//         distpachRegisterSuccess(dispatch, { role: resp.data.role, status: true })
//       }
//     } catch (error) {
//       console.log(error)
//       message.error(error.response.data.message)
//       dispatchRegisterFailure(dispatch)
//     }
//   }
// }

// export const AuthLogout = () => async (dispatch) => {
//   await axios.post('/logout')
//   dispatch({
//     type: AUTH_LOGOUT.SUCCESS,
//     payload: {},
//   })
// }

// const dispatchRegisterReq = (dispatch) => {
//   dispatch({
//     type: AUTH_REGISTER.REQUEST,
//   })
// }

// const distpachRegisterSuccess = (dispatch, { status, role }) => {
//   dispatch({
//     type: AUTH_REGISTER.SUCCESS,
//     payload: {
//       status: true,
//       role,
//     },
//   })
// }

// const dispatchRegisterFailure = (dispatch) => {
//   dispatch({
//     type: AUTH_REGISTER.FAILURE,
//   })
// }

// const dispatchLoginSuccess = (dispatch, { authenticate, role }) => {
//   return dispatch({
//     type: AUTH_LOGIN.SUCCESS,
//     payload: {
//       status: authenticate,
//       role: role,
//     },
//   })
// }

// const distpachLoginFailure = (dispatch) => {
//   return dispatch({
//     type: AUTH_LOGIN.FAILURE,
//   })
// }

// const dispatchLoginRequest = (dispatch) => {
//   return dispatch({
//     type: AUTH_LOGIN.REQUEST,
//   })
// }

// const loginSuccess = (value) => (dispatch) => {
//   return dispatchLoginSuccess(dispatch, value)
// }

// export { loginSuccess }

// const login = (value) => (dispatch) => {
//   return dispatch({
//     type: AUTH_LOGIN.SUCCESS,
//     payload: value,
//   })
// }

// const register = (value) => (dispatch) => {
//   return dispatch({
//     type: AUTH_LOGIN.SUCCESS,
//     payload: value,
//   })
// }

// const removeOldUser = (value) => (dispatch) => {
//   return dispatch({
//     type: AUTH_LOGIN.SUCCESS,
//     payload: value,
//   })
// }
