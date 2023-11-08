const { successHandler, errHandler, deletedHandler } = require('@response')
const OrderService = require('@service/v1/admin/order.service')
module.exports = class OrderAdmin {
  PAGE_SIZE = 10

  constructor() {}

  getOrderByID = async (req, res) => {
    try {
      const data = await new OrderService(req).getOrderByID(req)
      return successHandler(data, res)
    } catch (err) {
      console.log('getOrderBySlug error')
      return errHandler(err, res)
    }
  }

  getOrders = async (req, res) => {
    try {
      const data = await new OrderService(req).getOrder()
      return successHandler(data, res)
    } catch (err) {
      return errHandler(err, res)
    }
  }

  deleteOrder = async (req, res) => {
    try {
      const data = await new OrderService(req).deleteOrder(req)
      return deletedHandler(data, res)
    } catch (err) {
      console.log('deleteOrder error')
      return errHandler(err, res)
    }
  }
}
