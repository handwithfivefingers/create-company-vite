const { Transaction } = require('@model')
const BaseAdminService = require('@common/baseService')
module.exports = class AdminTransactionService extends BaseAdminService {
  getTransaction = async (req) => {
    try {
      const { paymentCode, dateFrom, dateTo } = req.query
      const listQuery = {}
      if (paymentCode) {
        listQuery.$text = { $search: paymentCode }
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
            deliveryInformation: '$deliveryInformation',
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      return newData
    } catch (error) {
      throw error
    }
  }

  updateTransaction = async (req) => {
    try {
      const { isPayment, deliveryInformation } = req.body
      const { _id } = req.params
      console.log('_id', _id)
      const _trans = await Transaction.findById(_id)
      if (!_trans) throw new Error('Transaction doesnt exists')
      _trans.isPayment = isPayment
      _trans.deliveryInformation = deliveryInformation
      await _trans.save()
      return true
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}
