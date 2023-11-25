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