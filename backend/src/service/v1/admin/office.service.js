const BaseAdminService = require('../../../common/baseService')
const fs = require('fs')
const path = require('path')
const FileService = require('../fileService')
const axios = require('axios')
module.exports = class OfficeAdminService extends BaseAdminService {
  constructor(req) {
    super(req)
  }
  getOfficeFiles = async (req) => {
    try {
      const { orderID } = req.query
      if (!orderID) return []
      const officeFiles = `uploads/userData/${orderID}`
      const listFolder = await new FileService().getListFolder({ dir: officeFiles })
      const latestFolder = officeFiles + '/' + listFolder.pop()
      const documentFiles = await new FileService().getListFiles({ dir: latestFolder + '/doc', file_: [] })
      const pdfFiles = await new FileService().getListFiles({ dir: latestFolder + '/pdf', file_: [] })

      return {
        documentFiles: documentFiles.map((item) => item.replace('uploads/', 'public/')),
        pdfFiles: pdfFiles.map((item) => item.replace('uploads/', 'public/')),
      }
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  getBrowserToken = async (req) => {
    try {
      const { options } = req.body
      const resp = await axios.post(
        `${process.env.OFFICE_TOKEN}/blog/admin/v1/services`,
        {
          tenantID: 1,
          secretKey: 'Hdme1995',
          expiresIn: '1d',
          options,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            origin: "https://app.thanhlapcongtyonline.vn"
          },
        },
      )
      return resp.data.data
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}
