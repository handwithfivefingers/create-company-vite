import axios from '../config/axios'

const api_path = {
  authenticate: '/auth',

  logout: '/logout',

  register: '/register',

  registerOtp: '/register-otp',

  loginWithPhone: '/login-phone',

  loginOTP: '/login-otp',

  login: '/login',

  loginWithAdmin: '/login-admin',

  checkUserExist: '/verification-user',

  verifiResend: '/verification-resend',

  verify: '/verification',
}

const AuthService = {
  onAuthenticate: () => axios.post(api_path.authenticate),
  onLogout: () => axios.post(api_path.logout),
  onRegister: (form) => axios.post(api_path.register, form),

  getRegisterOTP: (form) => axios.post(api_path.registerOtp, form),

  isUserExist: (form) => axios.post(api_path.checkUserExist, form),

  loginWithPhone: (form) => axios.post(api_path.loginWithPhone, form),

  getLoginOTP: (form) => axios.post(api_path.loginOTP, form),

  onLogin: (form) => axios.post(api_path.login, form),

  onLoginWithAdmin: (form) => axios.post(api_path.loginWithAdmin, form),

  onVerify: (form) => axios.post(api_path.verify, form),

  onVerifyResend: () => axios.post(api_path.verifiResend),
}

export default AuthService
