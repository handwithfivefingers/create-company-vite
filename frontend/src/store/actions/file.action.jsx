import { FILE_TYPE } from '../type/file.type'

class FileAction {
  onUpdateFiles = (data) => async (dispatch) => {
    dispatch({
      type: FILE_TYPE.UPDATE_FILE,
      payload: data,
    })
  }
}
const useFileAction = () => ({ ...new FileAction() })
export { useFileAction }
