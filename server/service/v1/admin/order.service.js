const shortid = require('shortid')
const { Order, Category } = require('@model')
const BaseAdminService = require('@common/baseService')
const { getListFiles } = require('@constant/File')
const { uniqBy } = require('lodash')

module.exports = class OrderService extends BaseAdminService {
  PAGE_SIZE = 10

  getOrder = async () => {
    try {
      let _order = await Order.find({ delete_flag: { $ne: 1 } })
        .populate('main_career', ['name', 'code'])
        .populate('category', 'name type')
        .populate('products', 'name')
        .populate({
          path: 'orderOwner',
          select: 'name email',
        })
        .populate('transactionId', 'isPayment paymentType paymentCode deliveryInformation')
        .select('-orderInfo')
        .sort('-createdAt')

      let count = _order.length
      return { data: _order, count }
    } catch (error) {
      throw error
    }
  }

  getOrderByID = async (req) => {
    try {
      const { id } = req.params
      const _order = await Order.findById(id)
        .populate('products', 'name')
        .populate('category', 'name type')
        .populate({
          path: 'orderOwner',
          select: 'name email',
        })
        .populate('data.create_company.main_career', ['name', 'code'])
        .sort('-createdAt')

      return _order
    } catch (error) {
      throw error
    }
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
}
