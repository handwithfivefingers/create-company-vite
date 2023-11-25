import { combineReducers } from 'redux'

import authReducer from './auth.reducer'
import commonReducer from './common.reducer'
import routeReducer from './route.reducer'
import provinceReducer from './province.reducer'
import messageReducer from './message.reducer'
import { useSelector } from 'react-redux'

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  routeReducer,
  provinceReducer,
  messageReducer,
})

const useAuthStore = () => useSelector((state) => state.authReducer)
const useCommon = () => useSelector((state) => state.commonReducer)
const useRouteHistory = () => useSelector((state) => state.routeReducer)
const useProvince = () => useSelector((state) => state.provinceReducer)
const useMessage = () => useSelector((state) => state.messageReducer)

export default rootReducer
export { useAuthStore, useCommon, useRouteHistory, useProvince, useMessage }
