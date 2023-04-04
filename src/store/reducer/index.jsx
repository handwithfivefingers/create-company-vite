import { combineReducers } from 'redux'

import authReducer from './auth.reducer'
import commonReducer from './common.reducer'
import routeReducer from './route.reducer'
import provinceReducer from './province.reducer'
import messageReducer from './message.reducer'

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  routeReducer,
  provinceReducer,
  messageReducer,
})
export default rootReducer
