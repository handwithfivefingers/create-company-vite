const {
  errHandler,
  successHandler,
  permisHandler,
  existHandler,
} = require('../response')
const { Product, Order } = require('./../model')
const { sendmailWithAttachments } = require('./sendmail')
const shortid = require('shortid')
const qs = require('query-string')
const crypto = require('crypto')
const { ResponseCode } = require('../common/ResponseCode')
const { getListFiles } = require('../constant/File')
const { uniqBy } = require('lodash')
const { getVpnParams, sortObject } = require('../common/helper')
const PAGE_SIZE = 10

// Get getOrdersFromUser

const getOrdersFromUser = async (req, res) => {
  try {
    let _order = await Order.find({ orderOwner: req.id })
      .populate('products', 'name type')
      .populate('orderOwner', 'name')
      .sort('-createdAt')
    return successHandler(_order, res)
  } catch (err) {
    console.log('getOrdersFromUser error')
    return errHandler(err, res)
  }
}

const getOrderBySlug = async (req, res) => {
  const { id } = req.params

  try {
    if (req.role === 'admin') {
      const _order = await Order.findById(id).populate('products', 'name type')

      return successHandler(_order, res)
    }

    return permisHandler(res)
  } catch (err) {
    console.log('getOrderBySlug error')

    return errHandler(err, res)
  }
}

const createOrders = async (req, res) => {
  try {
    //  khai báo
    const { track, payment, data, categories } = req.body

    const { selectProduct, ...rest } = data

    if (!selectProduct) return errHandler('', res)

    let { files, result, msg } = findKeysByObject(rest, selectProduct?.type)

    if (!result) return errHandler(msg, res)

    let price = await calcPrice(selectProduct._id)

    if (!price) return errHandler('Product not found', res)

    if (!files) return errHandler('', res)
    console.log('req.id', req.id)
    let newData = {
      track,
      payment,
      data,
      categories,
      orderOwner: req.id,
      name: shortid.generate(),
      products: selectProduct._id,
      files,
      price,
    }

    newData.slug = newData.name + '-' + shortid.generate()

    let _save = new Order({ ...newData })

    let _obj = await _save.save()

    return successHandler(_obj, res)
  } catch (err) {
    console.log('createOrders error', err)
    return errHandler(err, res)
  }
}

const orderWithPayment = async (req, res) => {
  // const session = await mongoose.startSession();
  try {
    let exist = await Order.findOne({ orderId: req.body.orderId }) // findOne.length > 0 => exist || valid

    if (exist) return existHandler(res)

    //  khai báo
    const { track, payment, data, categories } = req.body

    const { selectProduct, ...rest } = data

    if (!selectProduct) return errHandler('', res)

    let price = await calcPrice(selectProduct._id)

    let { files, result, msg } = findKeysByObject(rest, selectProduct?.type)

    if (!price) return errHandler('Product not found', res)

    if (!result) return errHandler(msg, res)

    var newData = {
      track,
      payment,
      data,
      categories,
      orderOwner: req.id,
      name: shortid.generate(),
      products: selectProduct,
      price,
      files,
    }

    newData.slug = newData.name + '-' + shortid.generate()

    let _save = new Order({ ...newData })

    let _obj = await _save.save()

    // handle Payment Here
    let params = {
      amount: price * 100,
      orderInfo: _obj._id,
      orderId: req.body.orderId,
      createDate: req.body.createDate,
    }

    return paymentOrder(req, res, params)
  } catch (err) {
    console.log('orderWithPayment error', err)
    return errHandler(err, res)
  }
}

const getUrlReturn = async (req, res) => {
  // console.log(req.query, " Get URL Return");
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

    let url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3003/user/result?`
        : `https://app.thanhlapcongtyonline.vn/user/result?`

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      let code = vnp_Params['vnp_ResponseCode']
      const query = qs.stringify({
        code,
        text: ResponseCode[code],
      })

      if (code === '00') {
        // Success
        const _update = {
          payment: Number(1),
        }

        await Order.updateOne({ _id: req.query.vnp_OrderInfo }, _update, {
          new: true,
        })

        let _order = await Order.findOne({
          _id: req.query.vnp_OrderInfo,
        }).populate('orderOwner', '_id name email')

        let [_paymentSuccess] = await Setting.find().populate(
          'mailPaymentSuccess',
        )

        let params = {
          email: _order.orderOwner.email || 'handgd1995@gmail.com',
          subject: _paymentSuccess.subject,
          content: _paymentSuccess.content,
          type: 'any',
        }

        await sendmailWithAttachments(req, res, params)

        return res.redirect(url + query)
      }
      return res.redirect(url + query)
    } else {
      const query = qs.stringify({
        code: ResponseCode[97],
      })
      return res.redirect(url + query)
    }
  } catch (err) {
    console.log('getUrlReturn', err)
    return errHandler(err, res)
  }
}

const paymentOrder = (req, res, params) => {
  let vnp_Params = getVpnParams(req, params)

  var vnpUrl = process.env.VNPAY_URL

  vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false })

  return res.status(200).json({ status: 200, url: vnpUrl })
}

// common

const calcPrice = async (productId) => {
  if (!productId) return null

  let _prod = await Product.findOne({ _id: productId }).select('price')

  if (!_prod) return null

  return _prod.price
}

const findKeysByObject = (obj, type = null) => {
  let msg = ''
  let result = true

  if (!type) {
    result = false
    msg = `Missing ['type'] property`
  }

  if (!obj) {
    result = false
    msg = `Missing ['data"] property`
  }

  let files = []

  try {
    for (let props in obj) {
      let list = getListFiles(props)

      let keys = Object.keys(obj?.[props]).map((key) => key)

      if (keys && list && result) {
        for (let i = 0, len = keys.length; i < len; i++) {
          let key = keys[i]

          let objProperty = list?.[key]

          let isFunction = objProperty && typeof objProperty === 'function'

          if (isFunction) {
            // explicit property

            if (props === 'create_company') {
              let opt = obj[props][key]?.present_person // get selected item

              if (!opt) {
                result = false
                msg = `Missing Key ['present_person']`
              } else {
                files = [...files, ...objProperty(type, props, key, opt)]
              }
            } else {
              files = [...files, ...objProperty(type, props, key)]
            }
          }

          if (!result) break
        }
      }
    }

    files = uniqBy(files, 'path').filter((item) => item)

    return { files, result, msg }
  } catch (err) {
    console.log('findKeysByObject', err)
  }
}

module.exports = {
  getOrdersFromUser,
  getOrderBySlug,
  createOrders,
  orderWithPayment,
  getUrlReturn,
}
