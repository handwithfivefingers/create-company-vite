import { FILE_TYPE } from '../type/file.type'
const initState = {
  listDocFiles: [],
  listPdfFiles: [],
  pathLocation: undefined,
}

export default function fileReducer(state = initState, action) {
  switch (action.type) {
    case FILE_TYPE.UPDATE_FILE:
      return {
        ...state,
        listDocFiles: action.payload.listDocFiles,
        listPdfFiles: action.payload.listPdfFiles,
        pathLocation: action.payload.folder,
      }
    default:
      return state
  }
}
