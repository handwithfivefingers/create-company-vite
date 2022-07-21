const { errHandler, successHandler, permisHandler, existHandler } = require('../response');
const { Product, Category, Career, User, Order } = require('./../model');
const { sendmailWithAttachments } = require('./sendmail');
const shortid = require('shortid');
const mongoose = require('mongoose');
const qs = require('query-string');
const crypto = require('crypto');
const { ResponseCode } = require('../common/ResponseCode');
const { getListFiles } = require('../contants/File');
const { uniqBy } = require('lodash');
const { getVpnParams, sortObject } = require('../common/helper');
const fs = require('fs');
const PAGE_SIZE = 10;

// Get getOrdersFromUser

exports.getOrdersFromUser = async (req, res) => {
  try {
    let _order = await Order.find({ orderOwner: req.id })
      .populate('products', 'name type')
      .populate('orderOwner', 'name')
      .sort('-createdAt');
    // console.log(_order);
    return successHandler(_order, res);
  } catch (err) {
    console.log('getOrdersFromUser error');
    return errHandler(err, res);
  }
};

// admin
exports.getOrders = async (req, res) => {
  try {
    const { page, ...condition } = req.body;

    let current_page = (parseInt(page) - 1) * PAGE_SIZE;

    const email = new RegExp(condition?.name, 'i');

    let _user = await User.find({
      $and: [
        {
          email: email,
          // role: "User",
        },
      ],
    }).select('_id');

    let newCondition = _user.map((item) => ({ orderOwner: item._id }));

    if (req.role === 'admin') {
      let _order = await Order.find({
        $or: newCondition.length > 0 ? newCondition : [{}],
      })
        .populate('products', 'name')
        .populate('orderOwner', 'name email')
        .skip(current_page)
        .limit(PAGE_SIZE)
        .sort('-createdAt');

      const count = await Order.find({
        $or: newCondition.length > 0 ? newCondition : [{}],
      }).countDocuments();

      return successHandler({ _order, count, current_page: page || 1 }, res);
    }
    return getOrder(req, res);
  } catch (err) {
    console.log('getOrders error');
    return errHandler(err, res);
  }
};

const getOrder = async (req, res) => {
  try {
    let _order = await Order.find({ orderOwner: req.id })
      .populate('products', 'name')
      .populate('orderOwner', 'name')
      // .limit(10)
      .sort('-createdAt');

    return successHandler(_order, res);
  } catch (err) {
    console.log('getOrder error');
    return errHandler(err, res);
  }
};

exports.getOrderBySlug = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.role === 'admin') {
      const _order = await Order.findById(id).populate('products', 'name type');

      return successHandler(_order, res);
    }

    return permisHandler(res);
  } catch (err) {
    console.log('getOrderBySlug error');

    return errHandler(err, res);
  }
};

exports.createOrders = async (req, res) => {
  try {
    //  khai báo
    const { track, payment, data, categories } = req.body;

    const { selectProduct, selectChildProduct } = data;

    let files = findKeysByObject(data, selectProduct?.type);
    let price = await calcPrice(selectProduct._id);

    if (!price) return errHandler('Product not found', res);
    if (!files) return errHandler('', res);

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
    };

    newData.slug = newData.name + '-' + shortid.generate();

    let _save = new Order({ ...newData });

    let _obj = await _save.save();

    return successHandler(_obj, res);
  } catch (err) {
    console.log('createOrders error', err);
    return errHandler(err, res);
  }
};

exports.orderWithPayment = async (req, res) => {
  // const session = await mongoose.startSession();
  try {
    let exist = await Order.findOne({ orderId: req.body.orderId }); // findOne.length > 0 => exist || valid

    if (exist) return existHandler(res);

    //  khai báo
    const { track, payment, data, categories } = req.body;
    const { selectProduct } = data;

    let price = await calcPrice(selectProduct._id);

    let files = findKeysByObject(data, selectProduct?.type);

    if (!price) return errHandler('Product not found', res);
    if (!files) return errHandler('', res);

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
    };

    newData.slug = newData.name + '-' + shortid.generate();

    let _save = new Order({ ...newData });

    let _obj = await _save.save();

    // handle Payment Here
    let params = {
      amount: price * 100,
      orderInfo: _obj._id,
      orderId: req.body.orderId,
      createDate: req.body.createDate,
    };

    return paymentOrder(req, res, params);
  } catch (err) {
    console.log('orderWithPayment error', err);
    return errHandler(err, res);
  }
};

exports.getUrlReturn = async (req, res) => {
  // console.log(req.query, " Get URL Return");
  try {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.TMN_CODE_VPN;

    var secretKey = process.env.SECRET_KEY_VPN;

    var signData = qs.stringify(vnp_Params, { encode: false });

    var hmac = crypto.createHmac('sha512', secretKey);

    var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex');

    let url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/user/result?`
        : `https://app.thanhlapcongtyonline.vn/user/result?`;

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      let code = vnp_Params['vnp_ResponseCode'];
      const query = qs.stringify({
        code,
        text: ResponseCode[code],
      });

      if (code === '00') {
        // Success
        const _update = {
          payment: Number(1),
        };

        await Order.updateOne({ _id: req.query.vnp_OrderInfo }, _update, { new: true });

        // console.log("getUrlReturn updated Success");

        let _order = await Order.findOne({ _id: req.query.vnp_OrderInfo }).populate('orderOwner', '_id name email');

        // console.log(_order);

        let params = {
          email: _order.orderOwner.email,
          subject: 'Thanh toán thành công',
          content: `Chào ${_order?.orderOwner?.name},<br />
        Quý khách đã thanh toán thành công.
        Thông tin giấy tờ sẽ được gửi sớm nhất có thể, quý khách vui lòng đợi trong giây lát.
        <br/> Xin cảm ơn`,
          type: 'any',
        };
        await sendmailWithAttachments(req, res, params);

        return res.redirect(url + query);
      }
      return res.redirect(url + query);
    } else {
      const query = qs.stringify({
        code: ResponseCode[97],
      });
      return res.redirect(url + query);
    }
  } catch (err) {
    console.log('getUrlReturn', err);
    return errHandler(err, res);
  }
};

// exports.getFilefromPath = async (req, res) => {
//   let { filePath, fileName } = req.body;
//   if (!filePath) return;
//   if (!fileName) return;
//   try {
//     var data = fs.readFileSync('filePath');
//     res.contentType('application/pdf');
//     res.send(data);
//   } catch (err) {
//     console.log('getUrlReturn', err);
//     return errHandler(err, res);
//   }
// };

const paymentOrder = (req, res, params) => {
  let vnp_Params = getVpnParams(req, params);

  var vnpUrl = process.env.VNPAY_URL;

  vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

  return res.status(200).json({ status: 200, url: vnpUrl });
};

// common

const calcPrice = async (productId) => {
  if (!productId) return null;

  let _prod = await Product.findOne({ _id: productId }).select('price');

  if (!_prod) return null;

  return _prod.price;
};

const findKeysByObject = (obj, type = null) => {
  if (!type) return;
  if (!obj) return;

  try {
    let files = [];

    for (let props in obj) {
      let list = getListFiles(props);

      let keys = Object.keys(obj?.[props]).map((key) => key);

      if (keys && list) {
        for (let i = 0, len = keys.length; i < len; i++) {
          let key = keys[i];

          let objProperty = list?.[key];

          let isFunction = objProperty && typeof objProperty === 'function';
          if (isFunction) {
            // explicit property
            if (props === 'create_company') {
              let opt = obj[props][key]?.present_person; // get selected item
              files = [...files, ...objProperty(type, props, key, opt)];
            } else {
              files = [...files, ...objProperty(type, props, key)];
            }
          }
        }
      }
    }
    // console.log(files);
    files = uniqBy(files, 'path').filter((item) => item);
    return files;
  } catch (err) {
    console.log('findKeysByObject', err);
  }
};

// const findKeysByObject = (obj, listfiles) => {

//   if (!obj) return;

//   let files;
//   // console.log("findKeysByObject", files, obj);

//   for (let prop in obj) {
//     // prop => create_company || change_info || pending || disolution

//     if (listfiles[prop]) {

//       files = Object.keys(obj[prop]).map((key) => {

//         if (obj[prop][key]) {

//           if (typeof listfiles[prop][key] === 'object' && !Array.isArray(listfiles[prop][key])) {

//             // Check listfiles must be a Object
//             if (obj[prop][key].present_person) {

//               let person = obj[prop][key].present_person;

//               return listfiles[prop][key][person];

//             } else {

//               return listfiles[prop][key].personal;

//             }

//           } else return listfiles[prop][key];
//         }
//       });
//     }
//   }
//   return files;
// };
