import { CC_TYPE, ORDER_TYPE } from '../type/order.type'

class CreateCompanyAction {
  onUpdateGiaTriGopVon = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_GIATRIGOPVON,
      payload: data,
    })
  }
  onUpdateThanhVienGopVon = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_THANHVIENGOPVON,
      payload: data,
    })
  }
  onUpdateNguoiDaiDienCongTy = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_NGUOIDAIDIEN,
      payload: data,
    })
  }
  onUpdateDiaChiTruSoChinh = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_DIACHITRUSOCHINH,
      payload: data,
    })
  }
  onUpdateTenCongTy = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_TENCONGTY,
      payload: data,
    })
  }
  onUpdateNganhNgheDangKi = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_NGANHNGHEDANGKI,
      payload: data,
    })
  }
  onUpdateCreateCompany = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE,
      payload: data,
    })
  }
  onUpdateForm = (data) => async (dispatch) => {
    dispatch({
      type: CC_TYPE.UPDATE_FORM,
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
    dispatch({
      type: ORDER_TYPE.UPDATE_CATEGORY,
      payload: data,
    })
  }
}
const useOrderAction = () => ({ ...new CreateCompanyAction(), ...new OrderAction() })
export { useOrderAction }
