const { Transaction, TemplateMail } = require('@model')
const BaseAdminService = require('@common/baseService')
const { startSession } = require('mongoose')
const SettingService = require('./setting.service')
const MailService = require('../user/mail.service')
const path = require('path')
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
    const session = await startSession()
    try {
      session.startTransaction()
      const { isPayment, deliveryInformation } = req.body
      const { _id } = req.params
      const _trans = await Transaction.findById(_id).populate({
        path: 'orderId',
        populate: [
          {
            path: 'orderOwner',
          },
          {
            path: 'category',
          },
        ],
      })

      console.log('_trans', _trans)
      if (!_trans) throw new Error('Transaction doesnt exists')
      _trans.isPayment = isPayment
      _trans.deliveryInformation = deliveryInformation
      await _trans.save()
      if (isPayment) {
        const { category, data } = _trans?.orderId
        const type = category.type
        const productData = await this.getProductName(data, type)
        const attachments = await this.getAttachmentForPaymentSuccess(productData, type)
        console.log('productName', attachments)

        // const attachments = this.getAttachmentForPaymentSuccess({ type, data })
        // this.sendMailWhenPaymentSuccess({ order: _trans?.orderId, attachments, req, productData })
      }
      await session.commitTransaction()
      session.endSession()
      return true
    } catch (error) {
      console.log('updateTransaction error', error)
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }

  sendMailWhenPaymentSuccess = async ({ order, req, attachments, productData }) => {
    try {
      const { email, name } = order.orderOwner
      const _mail = await new SettingService(req).getSetting(req)
      const paymentSuccessMail = _mail.mailPaymentSuccess
      const mailResponse = await new MailService().sendWithAttachments({
        attachments,
        skipValidate: true,
        to: email,
        subject: paymentSuccessMail.subject,
        html: paymentSuccessMail.content
          .replace(`{userName}`, name)
          .replace(`{orderName}`, order._id)
          .replace(`{productName}`, productData[0])
          .replace(`{price}`, order.price), // {userName} {orderName} {productName} {price} }
      })

      console.log('_mail', _mail, mailResponse)
    } catch (error) {
      console.log('sendMailWhenPaymentSuccess error', error)
    }
  }
  getProductName = async (data, type) => {
    const DATA_PRODUCT = {
      pending: {
        1: ['Tạm hoãn', '1 Thành viên'],
        2: ['Tạm hoãn', '2 Thành viên'],
        3: ['Tạm hoãn', 'Cổ phần'],
      },
      change_info: {
        1: ['Thay đổi thông tin', '1 Thành viên'],
        2: ['Thay đổi thông tin', '2 Thành viên'],
        3: ['Thay đổi thông tin', 'Cổ phần'],
      },
      create_company: {
        1: ['Thành lập doanh nghiệp', '1 Thành viên'],
        2: ['Thành lập doanh nghiệp', '2 Thành viên'],
        3: ['Thành lập doanh nghiệp', 'Cổ phần'],
      },
      dissolution: {
        1: ['Giải thể', '1 Thành viên'],
        2: ['Giải thể', '2 Thành viên'],
        3: ['Giải thể', 'Cổ phần'],
      },
    }

    let result = null
    for (let key in DATA_PRODUCT) {
      if (data.hasOwnProperty(key)) {
        result = DATA_PRODUCT[key][type]
        break
      }
    }
    return result
  }
  getAttachmentForPaymentSuccess = async (productData, type) => {
    try {
      const TLDN = {
        1_1: {
          fileName: 'Cá nhân - 1 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Create', '1TV-CaNhan.doc'),
        },
        1_2: {
          fileName: 'Tổ chức - 1 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Create', '1TV-ToChuc.doc'),
        },
        2: {
          fileName: '2 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Create', '2TV.doc'),
        },
        3: {
          fileName: 'Cổ phần.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Create', 'CoPhan.doc'),
        },
      }
      const TH = {
        1: {
          filename: '1 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Pending', '1TV.doc'),
        },
        2: {
          filename: '2 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Pending', '2TV.doc'),
        },
        3: {
          filename: 'Cổ phần.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Pending', 'CoPhan.doc'),
        },
      }
      const GT = {
        1: {
          filename: '1 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Dissolution', '1TV.doc'),
        },
        2: {
          filename: '2 Thành viên.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Dissolution', '2TV.doc'),
        },
        3: {
          filename: 'Cổ phần.doc',
          path: path.join(global.__basedir, 'uploads', 'files', 'paymentSuccess', 'Dissolution', 'CoPhan.doc'),
        },
      }

      if (productData.includes('Thành lập doanh nghiệp')) {
        if (type !== 1) return TLDN[type]
        return [TLDN[1_1], TLDN[1_2]]
      } else if (productData.includes('Thay đổi thông tin')) return
      else if (productData.includes('Tạm hoãn')) return TH[type]
      else if (productData.includes('Giải thể')) return GT[type]
    } catch (error) {}
  }
}
