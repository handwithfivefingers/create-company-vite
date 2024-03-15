import { CC_TYPE, CI_TYPE, ORDER_TYPE } from '../type/order.type'
const initState = {
  createCompany: {},
  createCompanyForm: {},
  changeInfo: {},
  pending: {},
  dissolution: {},
  category: {},
  products: [],
}

const OrderReducer = (state = initState, action) => {
  switch (action.type) {
    case CC_TYPE.UPDATE_GIATRIGOPVON:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          base_val: action.payload,
        },
      }
    case CC_TYPE.UPDATE_THANHVIENGOPVON:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          origin_person: action.payload,
        },
      }
    case CC_TYPE.UPDATE_NGUOIDAIDIEN:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          base_val: action.payload,
        },
      }
    case CC_TYPE.UPDATE_DIACHITRUSOCHINH:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          company_location: action.payload,
        },
      }
    case CC_TYPE.UPDATE_TENCONGTY:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          company_name: action.payload,
        },
      }
    case CC_TYPE.UPDATE_NGANHNGHEDANGKI:
      return {
        ...state,
        createCompany: {
          ...state.createCompany,
          company_career: action.payload,
        },
      }
    case CC_TYPE.UPDATE:
      return {
        ...state,
        createCompany: action.payload,
      }
    case CC_TYPE.UPDATE_FORM:
      return {
        ...state,
        createCompanyForm: {
          ...state.createCompanyForm,
          ...action.payload,
        },
      }
    case ORDER_TYPE.UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
    case ORDER_TYPE.UPDATE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state
  }
}
export default OrderReducer
