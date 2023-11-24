import { MESSAGE } from '@/store/type/message.type'

const setErrorsMessage = (errorList) => (dispatch) => {
  dispatch({
    type: MESSAGE.SET_MESSAGE,
    payload: {
      errorList,
    },
  })
}

const clearMessage = () => (dispatch) =>
  dispatch({
    type: MESSAGE.CLEAR_MESSAGE,
  })

export { setErrorsMessage, clearMessage }
