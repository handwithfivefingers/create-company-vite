import { CC_TYPE, CI_TYPE, ORDER_TYPE } from '../type/order.type'

class CreateCompanyAction {
  onUpdateCreateCompany = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE,
      payload: data,
    })
  }
  onClear = () => async (dispatch) => {
    dispatch({ type: CC_TYPE.CLEAR })
  }
}
class ChangeInfoAction {
  onUpdateChangeInfo = (data) => async (dispatch) => {
    dispatch({
      type: CI_TYPE.UPDATE,
      payload: data,
    })
  }
}

class OrderAction {
  onUpdateProducts = (data) => async (dispatch) => {
    dispatch({
      type: ORDER_TYPE.UPDATE_PRODUCT,
      payload: data,
    })
  }
  onUpdateCategory = (data) => async (dispatch) => {
    console.log('data', data)
    dispatch({
      type: ORDER_TYPE.UPDATE_CATEGORY,
      payload: data,
    })
  }
  onToggleMethod = (method) => async (dispatch) => {
    dispatch({
      type: ORDER_TYPE.TOGGLE_METHOD,
      payload: method,
    })
  }
  onUpdateOrderID = (id) => async (dispatch) => {
    dispatch({
      type: ORDER_TYPE.UPDATE_ORDER_ID,
      payload: id,
    })
  }
}
const useOrderAction = () => ({ ...new CreateCompanyAction(), ...new ChangeInfoAction(), ...new OrderAction() })
export { useOrderAction }
