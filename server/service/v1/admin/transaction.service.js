const { Transaction } = require('@model')
module.exports = class AdminTransactionService {
  constructor() {}

  getTransaction = async (req) => {
    try {
      const { paymentCode, dateFrom, dateTo } = req.query
      const listQuery = {}
      if (paymentCode) {
        listQuery.paymentCode = paymentCode
      }
      if (dateFrom || dateTo) {
        const inDate = {}
        if (dateFrom) {
          inDate['$gte'] = new Date(dateFrom)
        }
        if (dateTo) {
          inDate['$lte'] = new Date(dateTo)
        }
        listQuery.createdAt = inDate
      }

      const newData = await Transaction.aggregate([
        {
          $match: listQuery,
        },
        {
          $project: {
            _id: '$_id',
            orderId: '$orderId',
            paymentType: '$paymentType',
            paymentDate: '$paymentDate',
            paymentCode: '$paymentCode',
            deliveryInformation: '$deliveryInformation',
            isPayment: '$isPayment',
            createdAt: '$createdAt',
          },
        },
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'transactionId',
            as: 'order',
          },
        },
        {
          $unwind: '$order',
        },
        {
          $project: {
            _id: '$_id',
            orderId: '$orderId',
            orderOwner: '$order.orderOwner',
            paymentType: '$paymentType',
            paymentDate: '$paymentDate',
            paymentCode: '$paymentCode',
            createdAt: '$createdAt',
            price: '$order.price',
            isPayment: '$isPayment',
            data: '$order.data',
          },
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
      ])
      return newData
    } catch (error) {
      throw error
    }
  }
}
