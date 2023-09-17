const qs = require('query-string')
const { Order, Setting, Transaction } = require('@model')
const MailService = require('@service/v1/user/mail.service')
const { ResponseCode } = require('@common/ResponseCode')
const { sortObject, generatePaymentCode } = require('@common/helper')
const moment = require('moment')
const crypto = require('crypto')

const urlResult =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3003/user/result?`
    : `https://app.thanhlapcongtyonline.vn/user/result?`

module.exports = class PaymentService {
  getUrlReturn = async (req, res) => {
    try {
      var vnp_Params = req.query

      var secureHash = vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHashType']

      vnp_Params = sortObject(vnp_Params)

      var secretKey = process.env.SECRET_KEY_VPN

      var signData = qs.stringify(vnp_Params, { encode: false })

      var hmac = crypto.createHmac('sha512', secretKey)

      var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex')

      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        let orderId = vnp_Params['vnp_OrderInfo']

        let _order = await Order.findOne({
          _id: vnp_Params.vnp_OrderInfo,
          'orderInfo.vnp_TxnRef': vnp_Params.vnp_TxnRef,
        }).populate('orderOwner', '_id name email')

        if (!_order) {
          return this.sendResponseToClient(
            {
              code: '01',
              text: 'Đơn hàng không tồn tại',
              orderId,
            },
            res,
          )
        }

        let isMatchAmount = +_order.price * 100 === +vnp_Params.vnp_Amount

        if (!isMatchAmount) {
          return this.sendResponseToClient(
            {
              code: '04',
              text: 'Số tiền giao dịch không chính xác',
              orderId,
            },
            res,
          )
        }

        if (vnp_Params['vnp_ResponseCode'] === '00' && vnp_Params['vnp_TransactionStatus'] === '00') {
          let [{ subject, content }] = await Setting.find().populate('mailPaymentSuccess')

          let params = {
            to: _order.orderOwner.email || 'handgd1995@gmail.com',
            subject,
            html: content,
          }

          new MailService().sendMail(params)
        } else {
          code = vnp_Params['vnp_ResponseCode']
          text = `Giao dịch không thành công, vui lòng kiểm tra lại đơn hàng của bạn`
        }

        return this.sendResponseToClient(
          {
            code: vnp_Params['vnp_ResponseCode'],
            text: ResponseCode[vnp_Params['vnp_ResponseCode']],
            orderId,
          },
          res,
        )
      } else {
        const query = qs.stringify({
          code: ResponseCode[97],
          text: ResponseCode[97],
        })
        return res.redirect(urlResult + query)
      }
    } catch (err) {
      return this.sendResponseToClient(
        {
          code: 99,
          text: `Giao dịch không thành công, vui lòng kiểm tra lại đơn hàng của bạn`,
          orderId: req.query.vnp_Params?.['vnp_OrderInfo'],
        },
        res,
      )
    }
  }
  getIPNUrl = async (req, res) => {
    try {
      let vnp_Params = req.query
      let secureHash = vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHash']
      delete vnp_Params['vnp_SecureHashType']

      vnp_Params = sortObject(vnp_Params)

      let secretKey = process.env.SECRET_KEY_VPN

      let signData = qs.stringify(vnp_Params, { encode: false })

      let hmac = crypto.createHmac('sha512', secretKey)

      let signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex')

      if (secureHash === signed) {
        let _order = await Order.findOne({
          _id: vnp_Params.vnp_OrderInfo,
          'orderInfo.vnp_TxnRef': vnp_Params.vnp_TxnRef,
        }).populate('orderOwner', '_id name email')

        // FIRST STEP - Order Exists

        if (!_order) {
          return { RspCode: '01', Message: ResponseCode['01'] }
          return res.status(200).json({ RspCode: '01', Message: ResponseCode['01'] })
        }
        // SECOND STEP -> Check Price Match

        let isMatchAmount = +_order.price * 100 === +vnp_Params.vnp_Amount

        if (!isMatchAmount) {
          return { RspCode: '04', Message: ResponseCode['04'] }
          return res.status(200).json({ RspCode: '04', Message: ResponseCode['04'] })
        }

        // Check Order Payment

        // THIRD STEP - Checking Payment Status

        if (_order.payment === 1) {
          return { RspCode: '02', Message: ResponseCode['02'] }

          return res.status(200).json({ RspCode: '02', Message: ResponseCode['02'] })
        }

        // pass all test case

        if (vnp_Params['vnp_ResponseCode'] === '00' && vnp_Params['vnp_TransactionStatus'] === '00') {
          _order.payment = 1

          _order.orderInfo = vnp_Params

          await _order.save()
        }

        // return res.status(200).json({ RspCode: '00', Message: ResponseCode['00'] })
        return { RspCode: '00', Message: ResponseCode['00'] }

        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      }

      return { RspCode: '00', Message: ResponseCode['00'] }
      // return res.status(200).json({ RspCode: '00', Message: ResponseCode['00'] })
    } catch (error) {
      // return res.status(400).json({
      //   RspCode: '99',
      //   Message: ResponseCode['99'],
      //   error,
      // })
      throw {
        RspCode: '99',
        Message: ResponseCode['99'],
        error,
      }
    }
  }

  createTransaction = async (req) => {
    try {
      const { orderId, paymentType } = req.body
      const _order = await Order.findOne({ _id: orderId })
      if (!_order) throw { message: 'Order not found' }

      const today = moment().locale('vi')
      const dateUnix = today.unix()

      const models = new Transaction({
        orderId,
        paymentType: Number(paymentType),
        paymentDate: dateUnix,
        paymentCode: generatePaymentCode({ data: _order.data, paymentDate: today, paymentType }),
      })

      const resp = await models.save()

      return { message: 'API done', transactionId: resp._id }
    } catch (error) {
      throw error
    }
  }
  getTransaction = async () => {
    try {
      const _trans = await Transaction.find().populate('orderId')
      return _trans
    } catch (error) {
      throw error
    }
  }

  sendResponseToClient = async (params, res) => {
    try {
      const query = qs.stringify(params)

      return res.redirect(urlResult + query)
    } catch (error) {
      throw error
    }
  }
}
