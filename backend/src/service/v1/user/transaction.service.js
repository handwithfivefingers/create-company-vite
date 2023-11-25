const { Transaction } = require('../../../model')
const mongoose = require('mongoose')

module.exports = class TransactionService {
  getTransaction = async (req) => {
    try {
      const data = await Transaction.aggregate([
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
          $match: {
            orderOwner: mongoose.Types.ObjectId(req.id),
          },
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
      ])

      return data
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}
