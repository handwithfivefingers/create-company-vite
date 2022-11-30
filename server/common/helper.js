const path = require('path')
const fs = require('fs')
const PizZip = require('pizzip')

const expressions = require('angular-expressions')

const Docxtemplater = require('docxtemplater')

const shortid = require('shortid')

const { assign, last, filter, ...lodash } = require('lodash')

const libre = require('libreoffice-convert')

const qs = require('query-string')

const crypto = require('crypto')

const moment = require('moment')

libre.convertAsync = require('util').promisify(libre.convert)

expressions.filters.lower = function (input) {
  if (!input) return input
  return input.toLowerCase()
}

expressions.filters.upper = function (input) {
  if (!input) return input
  return input.toUpperCase()
}

expressions.filters.divideBy = function (input, num) {
  if (!input) return input
  return input / num
}

expressions.filters.formatNumber = function (input, type) {
  if (!input) return input
  let val = input.toString()
  val = val.split('').reverse() //
  let len = Math.round(val.length / 3)
  let output = []
  for (let i = 0; i <= len; i++) {
    let typeOutput = val.length > 3 ? type : ''
    let Poutput = [...val.splice(0, 3), typeOutput]
    output.push(...Poutput)
  }
  return output.reverse().join('')
}

expressions.filters.formatDate = function (input, type = null) {
  if (!input) return input
  let val = input.toString()
  if (!val) ''
  else return moment(val).format(type ? type : '[ngày] DD [tháng] MM [năm] YYYY')
}

expressions.filters.where = function (input, query) {
  return input.filter(function (item) {
    let result = expressions.compile(query)(item)
    return result
  })
}

expressions.filters.toFixed = function (input, precision) {
  if (!input) return input
  return input.toFixed(precision)
}

function nullGetter(tag, props) {
  if (props.tag === 'simple') {
    return 'undefined'
  }
  if (props.tag === 'raw') {
    return ''
  }
  return ''
}

function angularParser(tag) {
  tag = tag.replace(/^\.$/, 'this').replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"')
  const expr = expressions.compile(tag)
  return {
    get: function (scope, context) {
      let obj = {}
      const index = last(context.scopePathItem)
      const scopeList = context.scopeList
      const num = context.num
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = assign(obj, scopeList[i])
      }
      obj = assign(obj, { $index: index })
      return expr(scope, obj)
    },
  }
}

const applyContent = async (file = null, data = null) => {
  let dirname = global.__basedir

  let filePath = path.resolve(path.join(dirname, '/uploads/', file.path))

  const content = fs.readFileSync(filePath, 'binary')

  const zip = new PizZip(content)

  const doc = new Docxtemplater(zip, {
    parser: angularParser,
    nullGetter,
  })

  doc.render(data)

  return doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  })
}

const saveFileAsDocx = async (buffer, ext, fileName) => {
  let nameTrim = fileName.replace(/\s/g, '')

  let name = convertString(nameTrim)

  let filePath = path.join(global.__basedir, '/uploads', `${shortid.generate()}-${name}${ext}`)
  fs.writeFileSync(filePath, buffer)
  return filePath
}

const specialFields = ['company_main_career', 'company_opt_career']

const objToKeys = (obj, baseObj, path = null) => {
  Object.keys(obj).forEach((item) => {
    let isSpecial = specialFields.some((elmt) => elmt === item)

    let newPath = path ? [path, item].join('_') : item

    // Valid Item

    if (obj[item]) {
      // String || Number || Date

      if (typeof obj[item] !== 'object') {
        baseObj[newPath] = obj[item] // create exist value for Number || String field
      } else if (obj[item].length > 0) {
        // Handle with Array

        baseObj[newPath] = obj[item].map((elmt, i) => ({
          ...elmt,
          index: `${i + 1}`,
        }))
      } else {
        // Handle with object
        if (isSpecial) {
          let { name, code } = obj[item]
          baseObj[newPath] = { name, code }
        } else objToKeys(obj[item], baseObj, newPath)
      }
    }
  })
}

const flattenObject = (data) => {
  const _template = {}

  objToKeys(data, _template)

  const date = new Date()

  _template.date = date.getDate()

  _template.month = date.getMonth() + 1 // Month start at 0 -> 11

  _template.year = date.getFullYear()

  // handle Change Info Array;

  for (let props in _template) {
    if (props === 'create_company_approve_legal_respon') {
      _template.legal_respon = _template[props].map((item) => item)

      delete _template.create_company_approve_legal_respon
    }

    if (props === 'create_company_approve_origin_person') {
      _template.organiz = _template[props]
        .filter((item) => item.present_person !== 'personal')
        .map((item, index) => ({
          ...item,
          index: index + 1,
        }))

      _template[props] = _template[props].map((item) => item)
    }
    if (props === 'change_info_legal_representative_in_out') {
      // let val = _template[props].filter((item) => item.type === 'includes')

      // if (_template.change_info?.legal_representative?.in) {
      //   _template.change_info = {
      //     legal_representative: {
      //       ..._template.change_info?.legal_representative,
      //       in: [
      //         ..._template.change_info?.legal_representative.in,
      //         ..._template[props].filter((item) => item.type === 'includes'),
      //       ],
      //       // out: _template[props].filter((item) => item.type === 'excludes'),
      //     },
      //   }
      // }
      // if (_template.change_info?.legal_representative?.out) {
      //   _template.change_info = {
      //     legal_representative: {
      //       ..._template.change_info?.legal_representative,
      //       out: [
      //         ..._template.change_info?.legal_representative.in,
      //         ..._template[props].filter((item) => item.type === 'excludes'),
      //       ]
      //       ,
      //     },
      //   }
      // }

      _template.change_info = {
        legal_representative: {
          in: _template[props].filter((item) => item.type === 'includes'),
          out: _template[props].filter((item) => item.type === 'excludes'),
        },
      }
    }
  }

  // console.log(JSON.stringify(_template, null, 4))

  return _template
}

const convertFile = async (file, data) => {
  let buffer = await applyContent(file, data)

  let ext = '.pdf'

  let pdfBuf = await libre.convertAsync(buffer, ext, undefined)
  // console.log('converting')
  let pdfFile = await saveFileAsDocx(pdfBuf, ext, file.name) // docx input
  // console.log('saving file')
  return pdfFile
}

const removeListFiles = (attachments, path = null) => {
  try {
    for (let attach of attachments) {
      if (path) {
        fs.unlinkSync(attach.path)
      } else if (fs.existsSync(attach.pdfFile)) {
        fs.unlinkSync(attach.pdfFile)
      }
    }
  } catch (err) {
    console.log('removeListFiles error: ' + err)
  }
}

const sortObject = (obj) => {
  var sorted = {}
  var str = []
  var key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

const getVpnParams = (req, params) => {
  let { amount, orderInfo } = params

  let createDate = moment().format('YYYYMMDDHHmmss')
  let orderId = moment().format('HHmmss')

  var ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  var tmnCode = process.env.TMN_CODE_VPN

  var secretKey = process.env.SECRET_KEY_VPN

  var returnUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/api/order/payment/url_return'
      : process.env.RETURN_URL

  var orderType = req?.body?.orderType || 'billpayment'

  var locale = (Boolean(req.body?.language) && req.body?.language) || 'vn'

  var vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  }

  vnp_Params = sortObject(vnp_Params)

  var signData = qs.stringify(vnp_Params, { encode: false })

  var hmac = crypto.createHmac('sha512', secretKey)

  var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex')

  vnp_Params['vnp_SecureHash'] = signed
  return vnp_Params
}

const findNestedObj = (entireObj, { ...rest }) => {
  let foundObj
  let { keyToFind, valToFind } = rest

  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue
    }
    return nestedValue
  })
  return foundObj
}

const filterData = (data = null) => {
  if (data) {
    return data.map((item) => ({
      name: item.name,
      price: item?.price,
      type: item?.type,
      _id: item?._id,
      slug: item?.slug,
      categories: filterData(item?.categories),
      parentId: item?.parentId || [],
    }))
  } else return null
}

const filterCaregories = (prevData) => {
  let data = []

  let parent
  let children

  parent = prevData.filter((item) => item.parentId.length == 0)
  children = prevData.filter((item) => item.parentId.length > 0)

  for (let p of parent) {
    data.push({
      name: p?.name,
      price: p?.price,
      type: p?.type,
      _id: p?._id,
      slug: p?.slug,
      categories: p?.categories,
      children: [],
    })
  }

  if (children.length > 0) {
    children.map((child) => {
      const current = handleCheckChildren(child, data)
      data = current
    })
  }
  return data
}

const handleCheckChildren = (child, data) => {
  return data.map((item) => {
    if (lodash.some(child.parentId, { _id: item._id })) {
      item.children.push({ ...child })
      return item
    } else {
      return item
    }
  })
}

const convertString = (str) => {
  return (
    str
      ?.normalize('NFD')
      ?.replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D') || str
  )
}

module.exports = {
  sortObject,
  getVpnParams,
  flattenObject,
  convertFile,
  removeListFiles,
  findNestedObj,
  filterData,
  filterCaregories,
  handleCheckChildren,
}
