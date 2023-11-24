import { MESSAGE } from '@/store/type/message.type'

const initState = {
  errorList: [],
}

const MessageReducer = (state = initState, action) => {
  switch (action.type) {
    case MESSAGE.SET_MESSAGE:
      return {
        ...state,
        errorList: action.payload.errorList,
      }
    case MESSAGE.CLEAR_MESSAGE:
      return initState
    default:
      return state
  }
}
export default MessageReducer
