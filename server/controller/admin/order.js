const {
  existHandler,
  successHandler,
  errHandler,
  permisHandler,
  deletedHandler,
} = require('../../response')
const { Order, Product, User } = require('../../model')
const _ = require('lodash')

const PAGE_SIZE = 10

const getOrderBySlug = async (req, res) => {
  const { id } = req.params
  if (req.role === 'admin') {
    try {
      const _order = await Order.findById(id)
        .populate('products', 'name type')
        .populate('data.create_company.main_career', ['name', 'code'])
      return successHandler(_order, res)
    } catch (err) {
      console.log('getOrderBySlug error')

      return errHandler(err, res)
    }
  }
  return permisHandler(res)
}

const getOrders = async (req, res) => {
  try {
    if (req.role === 'admin') {
      let _order = await Order.find()
        .populate('main_career', ['name', 'code'])
        .populate('products', 'name')
        .populate({
          path: 'orderOwner',
          select: 'name email',
        })
        .sort('-createdAt')
      const count = await Order.find({}).countDocuments()

      return successHandler({ _order, count }, res)
    }
    return permisHandler(res)
  } catch (err) {
    console.log('getOrders error')

    return errHandler(err, res)
  }
}

const deleteOrder = async (req, res) => {
  let { id } = req.params
  try {
    await Order.findOneAndDelete({ _id: id })

    return deletedHandler(_, res)
  } catch (err) {
    console.log('deleteOrder error')

    return errHandler(err, res)
  }
}

module.exports = {
  getOrderBySlug,
  getOrders,
  deleteOrder,
}
