import { combineReducers } from 'redux'

import authReducer from './auth.reducer'
import commonReducer from './common.reducer'
import routeReducer from './route.reducer'
import provinceReducer from './province.reducer'
import messageReducer from './message.reducer'
import orderReducer from './order.reducer'
import { useSelector } from 'react-redux'

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  routeReducer,
  provinceReducer,
  messageReducer,
  orderReducer,
})

const useAuthStore = () => useSelector((state) => state.authReducer)
const useCommon = () => useSelector((state) => state.commonReducer)
const useRouteHistory = () => useSelector((state) => state.routeReducer)
const useProvince = () => useSelector((state) => state.provinceReducer)
const useMessage = () => useSelector((state) => state.messageReducer)
const useCategoryOrder = () => useSelector((state) => state.order?.category)
const useProductsOrder = () => useSelector((state) => state.order?.products)
const useCreateCompanyOrder = () => useSelector((state) => state.order?.createCompany?.approve)
const useBaseValOrder = () => useSelector((state) => state.order?.createCompany?.approve?.base_val)
const useOrder = (fields = null) =>
  useSelector((state) => {
    if (Array.isArray(fields) && fields.length) {
      let nextState = state.orderReducer
      let len = fields.length
      for (let [index, field] of fields.entries()) {
        if (nextState[field]) {
          nextState = nextState[field]
        } else {
          break
        }
      }
      return nextState
    }
    return state.orderReducer
  })

export default rootReducer
export {
  useAuthStore,
  useCommon,
  useRouteHistory,
  useProvince,
  useMessage,
  useCategoryOrder,
  useProductsOrder,
  useCreateCompanyOrder,
  useBaseValOrder,
  useOrder,
}
