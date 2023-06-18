const qs = require('query-string')

const { errHandler } = require('@server/response')

const { Order, Setting } = require('@server/model')

const MailService = require('@server/controller/user/Sendmail')

const { sendmailWithAttachments } = new MailService()

const { ResponseCode } = require('@server/common/ResponseCode')

const { getVpnParams, sortObject } = require('@server/common/helper')

const crypto = require('crypto')

const { startSession } = require('mongoose')

const moment = require('moment')

const urlResult =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3003/user/result?`
    : `https://app.thanhlapcongtyonline.vn/user/result?`

module.exports = class PaymentService {
  testPayment = (req, res) => {
    let { amount, orderInfo } = req.body

    return this.paymentOrder(req, res, { amount, orderInfo })
  }

  paymentOrder = async (req, res, params) => {
    const session = await startSession()

    try {
      let { amount, orderInfo } = params

      // Start Transaction
      session.startTransaction()

      let vnp_Params = getVpnParams(req, params)

      var vnpUrl = process.env.VNPAY_URL

      vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false })

      let _update = {
        orderInfo: { ...vnp_Params },
        amount,
      }
      await Order.updateOne({ _id: orderInfo }, _update, { session, new: true })

      await session.commitTransaction()

      session.endSession()

      return res.status(200).json({ status: 200, url: vnpUrl })
    } catch (err) {
      console.log('paymentOrder', err)

      await session.abortTransaction()

      session.endSession()

      return errHandler(err, res)
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

        if (!_order) return res.status(200).json({ RspCode: '01', Message: ResponseCode['01'] })

        // SECOND STEP -> Check Price Match

        let isMatchAmount = +_order.price * 100 === +vnp_Params.vnp_Amount

        if (!isMatchAmount) return res.status(200).json({ RspCode: '04', Message: ResponseCode['04'] })

        // Check Order Payment

        // THIRD STEP - Checking Payment Status

        if (_order.payment === 1) return res.status(200).json({ RspCode: '02', Message: ResponseCode['02'] })

        // pass all test case

        if (vnp_Params['vnp_ResponseCode'] === '00' && vnp_Params['vnp_TransactionStatus'] === '00') {
          _order.payment = 1

          _order.orderInfo = vnp_Params

          await _order.save()
        }

        return res.status(200).json({ RspCode: '00', Message: ResponseCode['00'] })

        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      }

      return res.status(200).json({ RspCode: '00', Message: ResponseCode['00'] })
    } catch (error) {
      return res.status(400).json({
        RspCode: '99',
        Message: ResponseCode['99'],
        error,
      })
    }
  }

  getUrlReturn = async (req, res) => {
    try {
      var vnp_Params = req.query

      var secureHash = vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHash']

      delete vnp_Params['vnp_SecureHashType']

      vnp_Params = sortObject(vnp_Params)

      var tmnCode = process.env.TMN_CODE_VPN

      var secretKey = process.env.SECRET_KEY_VPN

      var signData = qs.stringify(vnp_Params, { encode: false })

      var hmac = crypto.createHmac('sha512', secretKey)

      var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex')

      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        let orderId = vnp_Params['vnp_OrderInfo']
        let code = vnp_Params['vnp_ResponseCode']

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
            email: _order.orderOwner.email || 'handgd1995@gmail.com',
            subject,
            content,
            type: 'any',
          }

          sendmailWithAttachments(req, res, params)
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
      return errHandler(err, res)
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
