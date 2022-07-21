import { message } from 'antd';
import axios from '@/config/axios';
import AuthService from '@/service/AuthService';
import { AUTH, AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER } from '../type/auth.type';
export const AuthUser = () => {
  return (dispatch) => {
    dispatch({
      type: AUTH.AUTH_REQUEST,
    });
    axios
      .post('/auth')
      .then((res) => {
        dispatch({
          type: AUTH.AUTH_SUCCESS,
          payload: {
            status: res.data.authenticate,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH.AUTH_FAILURE,
        });
      });
  };
};

export const AuthLogin = (val) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOGIN.REQUEST,
    });
    try {
      const resp = await AuthService.onLogin(val);
      if (resp.status === 200) {
        dispatch({
          type: AUTH_LOGIN.SUCCESS,
          payload: {
            status: resp.data.authenticate,
            role: resp.data.data.role,
          },
        });
        message.success('Login success');
      }
    } catch (err) {
      dispatch({
        type: AUTH_LOGIN.FAILURE,
      });
      message.error(err.response.data.message);
    }
  };
};

export const AuthRegister = (form) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_REGISTER.REQUEST,
    });
    try {
      let resp = await AuthService.onRegister(form);
      if (resp.status === 201) {
        message.success(resp.data.message);
        dispatch({
          type: AUTH_REGISTER.SUCCESS,
          payload: {
            status: true,
            role: resp.data.role,
          },
        });
      } else {
        message.error(resp.data.message);
        dispatch({
          type: AUTH_REGISTER.FAILURE,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const AuthLogout = () => {
  return async (dispatch) => {
    await axios.post('/logout');
    dispatch({
      type: AUTH_LOGOUT.SUCCESS,
      payload: {},
    });
  };
};
