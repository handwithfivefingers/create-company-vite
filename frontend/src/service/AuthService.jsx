import axios from '../config/axios'

const api_path = {
  authenticate: '/auth',

  logout: '/logout',

  registerOtp: '/register-otp',
  loginWithPhone: '/login-phone',
  loginOTP: '/login-otp',
  loginWithAdmin: '/login-admin',

  checkUserExist: '/verification-user',
  verifiResend: '/verification-resend',
  checkTokenExist: '/verification-token',
  verify: '/verification',
}

const AuthService = {
  onAuthenticate: () => axios.post(api_path.authenticate),

  onLogout: () => axios.post(api_path.logout),

  getRegisterOTP: (form) => axios.post(api_path.registerOtp, form),

  isUserExist: (form) => axios.post(api_path.checkUserExist, form),

  loginWithPhone: (form) => axios.post(api_path.loginWithPhone, form),

  getLoginOTP: (form) => axios.post(api_path.loginOTP, form),

  onLoginWithAdmin: (form) => axios.post(api_path.loginWithAdmin, form),

  onVerify: (form) => axios.post(api_path.verify, form),

  onVerifyResend: () => axios.post(api_path.verifiResend),

  checkTokenExist: () => axios.post(api_path.checkTokenExist),
}

export default AuthService
