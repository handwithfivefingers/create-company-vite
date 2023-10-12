import axios from '@/config/axios'

const api_path = {
  fileCategory: '/admin/file_category',
  file: '/admin/file',
}

const AdminFileService = {
  getFileCate: (params) => axios.get(api_path.fileCategory, params),
  onUploadFiles: (params) => axios.post(api_path.file, params),
  onGetListFiles: (params) => axios.get(api_path.file, { params }),
}

export default AdminFileService
