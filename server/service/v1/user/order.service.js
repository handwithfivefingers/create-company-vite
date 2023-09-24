const { Order, Category } = require('@model')
const { getListFiles } = require('@constant/File')
const { uniqBy } = require('lodash')
const { isFunction } = require('../../../common/helper')

module.exports = class OrderService {
  PAGE_SIZE = 10

  getOrder = async (req) => {
    try {
      let _order = await Order.find({ orderOwner: req.id, delete_flag: 0 })
        .populate('category', 'name type')
        .populate('products', 'name')
        .populate('transactionId', 'isPayment paymentType paymentCode deliveryInformation')
        .select('-send -__v -delete_flag -name -files -updatedAt')
        .sort('-createdAt')
      let count = _order.length
      return { data: _order, count }
    } catch (error) {
      console.log('getOrder error', error)
      throw error
    }
  }

  getOrderById = async (req) => {
    try {
      const _id = req.params
      const _order = await Order.findOne({ _id, orderOwner: req.id })
        .populate({
          path: 'category',
          select: 'name price type',
        })
        .populate('products')
        .populate('transactionId')
        .select('-send -__v -files -delete_flag -createdAt')
      if (!_order) throw { message: 'Order not found' }
      return {
        data: { ..._order._doc },
      }
    } catch (error) {
      throw error
    }
  }

  createOrder = async (req) => {
    try {
      const { data } = req.body

      const { category, products, ...rest } = data

      if (!category) throw { message: 'Categories not found' }

      let { files, result, msg } = this.findKeysByObject(rest, category?.type)

      if (!result) throw { message: msg }

      let price = await this.calcPrice(category._id || category.value)

      if (!price) throw { message: 'Cant find price for category' }

      if (!files) throw { message: 'Something was wrong when generate file, please try again' }

      let newData = {
        data,
        orderOwner: req.id,
        category: category._id || category.value,
        products,
        files,
        price,
      }

      const _save = new Order(newData)

      const dataSaved = await _save.save()

      return {
        _id: dataSaved._id,
        orderOwner: dataSaved.orderOwner,
        message: 'Tạo đơn hàng thành công'
      }
    } catch (err) {
      console.log('createOrders error', err)
      throw err
    }
  }

  updateOrder = async (req) => {
    try {
      let _id = req.params._id

      let { data } = req.body

      let { category, products, ...rest } = data

      let { files, result, msg } = this.findKeysByObject(rest, category?.type)

      if (!result) throw { message: msg }

      if (!files) throw { message: 'Something was wrong when generate file, please try again' }

      let _updateObject = {
        category: category._id || category.value,
        products: products?.map((item) => item?.value || item),
        data,
        files,
      }

      await Order.updateOne({ _id }, _updateObject, { new: true })

      return { message: 'Updated Success' }
    } catch (error) {
      console.log('updateOrder error', error)
      throw error
    }
  }

  deleteOrder = async (req) => {
    try {
      const _id = req.params._id

      await Order.updateOne({ _id, orderOwner: req.id }, { delete_flag: 1 }, { new: true })

      return { message: 'Delete success' }
    } catch (error) {
      throw error
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

  /**
   * @param {_ obj: data Object such as create_company, change_info ....}
   * @param {_ number: type of category }
   */
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

            if (isFunction(objProperty)) {
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
