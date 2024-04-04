const { Order, FileConvertManagement } = require('../../../model')
const BaseAdminService = require('../../../common/baseService')
const { ConvertService, TestService } = require('../third-connect/convert.service')
const fs = require('fs')
const path = require('path')
const FileService = require('../fileService')
module.exports = class OrderService extends BaseAdminService {
  PAGE_SIZE = 10

  getOrder = async (req) => {
    try {
      const { _id, product, category, date } = req.query
      const condition = { delete_flag: { $ne: 1 } }
      if (_id) condition._id = _id
      if (product) condition[`data.${product}`] = { $exists: true }

      let _order = await Order.find({ ...condition })
        // .populate('main_career', ['name', 'code'])
        .populate({ path: 'category', populate: 'parentCategory' })
        .populate('products', 'name')
        .populate({
          path: 'orderOwner',
          select: 'name email',
        })
        .populate('transactionId', 'isPayment paymentType paymentCode deliveryInformation')
        .select('-orderInfo')
        .sort('-createdAt')

      const data = _order.map((doc) => {
        const pathFile = path.join(global.__basedir, 'uploads', `${doc._doc._id}`)
        const fileExists = fs.existsSync(pathFile)
        return {
          ...doc._doc,
          fileReady: fileExists,
        }
      })

      let count = _order.length
      return { data, count }
    } catch (error) {
      throw error
    }
  }

  getOrderByID = async (req) => {
    try {
      const { id } = req.params
      const _order = await Order.findById(id)
        .populate('products', 'name')
        .populate({
          path: 'category',
          select: 'name price type parentCategory files fileRules',
          populate: [
            {
              path: 'parentCategory',
              select: 'name files fileRules',
              populate: [
                {
                  path: 'files',
                  select: '_id fileName fileOriginalName path',
                },
              ],
            },
            {
              path: 'files',
              select: '_id fileName fileOriginalName path',
            },
          ],
        })
        .populate({
          path: 'orderOwner',
          select: 'name email',
        })
        // .populate('data.create_company.main_career', ['name', 'code'])
        .sort('-createdAt')

      const files = this.getFilesFromCategory(_order)

      return {
        _order,
        files: files,
      }
    } catch (error) {
      throw error
    }
  }

  getFilesFromCategory = ({ data, category }) => {
    try {
      let result = []

      let path = []

      if (data.create_company) {
        path = ['create_company', 'approve', 'origin_person']
      }

      const { fileRules, parentCategory, files } = category

      if (parentCategory.files?.length) {
        result.push(...parentCategory.files)
      }

      if (files.length) {
        result.push(...files)
      }

      if (fileRules.length) {
        for (let i = 0; i < fileRules.length; i++) {
          const rule = fileRules[i]
          const { condition, statement, then: valueByPass, else: valueNotBypass } = rule
          // GET ROOT DATA
          const dataCondition = this.accessDeepObject(data, path)
          // DYNAMIC CONDITION BASE ON RULES
          const isByPass = dataCondition?.[statement]?.((val) => this.convertStringToCondition(val, condition))
          if (isByPass) {
            // Remove Else Statement data
            result = result.filter((item) => !item._id.equals(valueNotBypass))
            console.log('result', result)
          } else {
            // Remove then Statement data
            result = result.filter((item) => !item._id.equals(valueByPass))
          }
        }
      }

      return result
    } catch (error) {
      throw error
    }
  }

  accessDeepObject = (objectData, pathArray) => {
    const access = new Function(`data`, `return data?.${pathArray.join('.')}`)
    return access(objectData, pathArray)
  }

  convertStringToCondition = (data, pathArray) => {
    const [field, condition, val] = pathArray
    const strExpr = `'${data[field]}' ${condition} '${val}'`
    console.log('strExpr', strExpr, data[field] === val)
    const res = new Function(`return ` + strExpr)()
    // const res = eval(strExpr)
    console.log('res', res)
    return res
  }

  deleteOrder = async (req) => {
    try {
      let { id } = req.params
      await Order.findOneAndUpdate({ _id: id }, { delete_flag: 1 })
      return true
    } catch (error) {
      throw error
    }
  }

  convertFileManual = async (req) => {
    try {
      let { id } = req.params
      const convertResponse = await new TestService().testOrderProcessSuccess({ orderID: id, userID: req.id })
      if (!convertResponse.folder) throw new Error('Folder not found')

      await new FileConvertManagement({
        folderUri: convertResponse.folder,
        orderID: convertResponse.orderID,
        delete_flag: 0,
      }).save()

      const listDocFiles = await new FileService().getListFolder({ dir: `${convertResponse.folder}/doc` })
      const listPdfFiles = await new FileService().getListFolder({ dir: `${convertResponse.folder}/pdf` })

      return {
        ...convertResponse,
        listDocFiles: listDocFiles.map((fileName) => ({
          name: fileName,
          uri: `${convertResponse.folder}/doc/${fileName}`,
        })),
        listPdfFiles: listPdfFiles.map((fileName) => ({
          name: fileName,
          uri: `${convertResponse.folder}/pdf/${fileName}`,
        })),
      }
    } catch (error) {
      throw error
    }
  }

  onFilesPreviews = async ({ id }) => {
    try {
      const dir = path.join(global.__basedir, 'uploads', `${id}`)
      const fileExists = await fs.existsSync(dir)
      if (!fileExists) return
      const fileList = fs.readdirSync(dir)
      return { data: fileList.map((file) => ({ url: `public/${id}/${file}`, name: file })) }
    } catch (error) {
      throw error
    }
  }
}
