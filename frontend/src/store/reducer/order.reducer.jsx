import { STATE_METHOD } from '../../constant/Common'
import { CC_TYPE, CI_TYPE, ORDER_TYPE } from '../type/order.type'
const initState = {
  createCompany: {},
  changeInfo: {
    legal_representation: {
      after_change: [
        {
          person_type: undefined,
        },
      ],
      in_out: [{}],
    },
  },
  pending: {},
  dissolution: {},
  category: {},
  products: [],
  method: STATE_METHOD['CREATE'],
  _id: null,
}

const OrderReducer = (state = initState, action) => {
  switch (action.type) {
    case CC_TYPE.UPDATE:
      return {
        ...state,
        createCompany: {
          ...action.payload,
        },
      }
    case CC_TYPE.CLEAR:
      return {
        ...state,
        createCompany: {},
        category: {},
      }

    case CI_TYPE.UPDATE: {
      return {
        ...state,
        changeInfo: {
          ...action.payload,
        },
      }
    }
    case CI_TYPE.CLEAR:
      return {
        ...state,
        createCompany: {},
        category: {},
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
    case ORDER_TYPE.TOGGLE_METHOD:
      return {
        ...state,
        method: action.payload,
      }
    case ORDER_TYPE.UPDATE_ORDER_ID:
      return {
        ...state,
        _id: action.payload,
      }
    default:
      return state
  }
}
export default OrderReducer
