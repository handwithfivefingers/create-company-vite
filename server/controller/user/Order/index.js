const shortid = require('shortid')
const qs = require('query-string')
const crypto = require('crypto')
const { errHandler, successHandler, permisHandler, existHandler } = require('@response')
const { Order, Category, Setting } = require('@model')

const { ResponseCode } = require('@common/ResponseCode')
const { getListFiles } = require('@constant/File')
const { getVpnParams, sortObject } = require('@common/helper')
const { uniqBy, rest } = require('lodash')

const MailService = require('@server/controller/user/Sendmail')
const PaymentService = require('../../Service/Payment')

const { sendmailWithAttachments } = new MailService()

const { paymentOrder } = new PaymentService()

module.exports = class OrderUser {
  PAGE_SIZE = 10

  // Get getOrdersFromUser

  getOrdersFromUser = async (req, res) => {
    try {
      let _order = await Order.find({ orderOwner: req.id })
        .populate('category', 'name type')
        .populate('products', 'name')
        .populate('orderOwner', 'name')
        .select('-orderInfo')
        .sort('-createdAt')

      let count = _order.length

      return successHandler({ _order, count }, res)
    } catch (err) {
      console.log('getOrdersFromUser error')
      return errHandler(err, res)
    }
  }

  getOrderBySlug = async (req, res) => {
    const { id } = req.params

    try {
      if (req.role === 'admin') {
        const _order = await Order.findById(id).populate('products', 'name type').select('-orderInfo')
        return successHandler(_order, res)
      }

      return permisHandler(res)
    } catch (err) {
      console.log('getOrderBySlug error')

      return errHandler(err, res)
    }
  }

  createOrders = async (req, res) => {
    try {
      const { payment, data } = req.body

      const { category, products, ...rest } = data

      if (!category) throw 'Categories not found'

      let { files, result, msg } = this.findKeysByObject(rest, category?.type)

      if (!result) throw { message: msg }

      let price = await this.calcPrice(category._id || category.value)

      if (!price) throw 'Cant find price for category'

      if (!files) throw 'Something was wrong when generate file, please try again'

      let newData = {
        payment,
        data,
        orderOwner: req.id,
        name: shortid.generate(),
        category: category._id || category.value,
        products,
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

  updateOrder = async (req, res) => {
    try {
      let _id = req.params._id
      let { data } = req.body

      let { category, products } = data

      let _updateObject = {
        category: category._id || category.value,
        products: products?.map((item) => item.value),
        data,
      }
      await Order.updateOne({ _id }, _updateObject, { new: true })

      return successHandler({ message: 'Updated Success' }, res)
    } catch (error) {
      console.log('updateOrder error', error)
    }
  }

  orderWithPayment = async (req, res) => {
    // const session = await mongoose.startSession();
    try {
      let exist = await Order.findOne({ orderId: req.body.orderId }) // findOne.length > 0 => exist || valid

      if (exist) return existHandler(res)

      //  khai báo
      const { data } = req.body

      const { category, products, ...rest } = data

      if (!category) throw 'Product not found'

      let price = await this.calcPrice(category._id || category.value)

      let { files, result, msg } = this.findKeysByObject(rest, category?.type)

      if (!price) throw 'Product not found'

      if (!result) throw msg

      var newData = {
        data,
        orderOwner: req.id,
        name: shortid.generate(),
        category: category._id || category.value,
        products,
        price,
        files,
      }

      newData.slug = newData.name + '-' + shortid.generate()

      let _save = new Order({ ...newData })

      let _obj = await _save.save()

      let params = {
        amount: price * 100,
        orderInfo: _obj._id,
      }

      return paymentOrder(req, res, params)
    } catch (err) {
      console.log('orderWithPayment error', err)
      return errHandler(err, res)
    }
  }

  updateAndPayment = async (req, res) => {
    try {
      let _id = req.params._id
      let { data } = req.body

      let { category, products } = data

      let _updateObject = {
        category: category._id || category.value,
        products: products?.map((item) => item.value),
        data,
      }

      let _order = await Order.findOne(_id)

      if (!_order) return errHandler(err, res)

      _order.category = category._id || category.value

      _order.products = products?.map((item) => item.value)

      _order.data = data

      await _order.save()

      let params = {
        amount: _order.price * 100,
        orderInfo: _order._id,
      }

      return paymentOrder(req, res, params)
    } catch (error) {
      console.log('updateOrder error', error)
      return errHandler(err, res)
    }
  }

  calcPrice = async (cateID) => {
    try {
      let price

      if (!cateID) return null

      let _cate = await Category.findOne({ _id: cateID }).populate('parentCategory')

      if (!_cate) return null

      if (_cate?.parentCategory) {
        price = _cate?.parentCategory?.price
      } else {
        price = _cate.price
      }

      return price

    } catch (error) {
      throw error
    }
  }

  findKeysByObject = (obj, type = null) => {
    let msg = ''
    let result = true

    if (!type) {
      result = false
      msg = `Missing ['type'] property`
    }

    if (!obj) {
      result = false
      msg = `Missing ['data'] property`
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
                // let opt = obj[props][key]?.present_person // get selected item

                let origin_person = obj[props][key]?.origin_person

                let opt = ''

                if (origin_person) {
                  let organization = origin_person.some((item) => item.present_person === 'organization')
                  organization ? (opt = 'organization') : (opt = 'personal')
                }

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
      throw err
    }
  }
}
