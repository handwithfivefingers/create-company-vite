const { existHandler, successHandler, errHandler, permisHandler, deletedHandler } = require('../../../response')
const { Order, Product, User } = require('../../../model')
const _ = require('lodash')

module.exports = class OrderAdmin {
  PAGE_SIZE = 10

  constructor() {}

  getOrderByID = async (req, res) => {
    const { id } = req.params
    try {
      if (req.role !== 'admin') return permisHandler(res)

      const _order = await Order.findById(id).populate('products', 'name type').populate('data.create_company.main_career', ['name', 'code'])

      return successHandler(_order, res)
    } catch (err) {
      console.log('getOrderBySlug error')
      return errHandler(err, res)
    }
  }

  getAllOrder = async (req, res) => {
    try {
      if (req.role !== 'admin') return permisHandler(res)

      let { type } = req.query

      // pagination using cursor
      /**
       *  Collections.find({ _id: { $gte: cursor_id } })
       * .limit(100);
       *
       */

      let _order = await Order.find({ delete_flag: { $ne: 1 } })
        .populate('main_career', ['name', 'code'])
        .populate('categories', 'name type')
        .populate('products', 'name')
        .populate({
          path: 'orderOwner',
          select: 'name email',
        })
        .sort('-createdAt')

      const count = await Order.find({}).countDocuments()

      return successHandler({ _order, count }, res)
    } catch (err) {
      console.log('getOrders error', err)
      return errHandler(err, res)
    }
  }

  deleteOrder = async (req, res) => {
    let { id } = req.params
    try {
      await Order.findOneAndUpdate({ _id: id }, { delete_flag: 1 })

      return deletedHandler(_, res)
    } catch (err) {
      console.log('deleteOrder error')

      return errHandler(err, res)
    }
  }

  reforceDelete = async (req, res) => {
    try {
      // return res.status(200).json({})
      await Order.deleteMany({})

      // await Category.insertMany(this.data)

      // let data = await Category.find({})

      return res.status(200).json({ message: 'delete done' })
    } catch (err) {
      console.log(err)
      return errHandler(err, res)
    } finally {
    }
  }
}
