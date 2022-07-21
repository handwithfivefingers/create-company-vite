const qs = require('query-string');
const { errHandler } = require('../../response');
const { Order } = require('../../model');
const { sendmailWithAttachments } = require('../sendmail');
const { ResponseCode } = require('../../common/ResponseCode');
const crypto = require('crypto');
const { startSession } = require('mongoose');
const { getVpnParams, sortObject } = require('../../common/helper');

exports.testPayment = (req, res) => {
  let { createDate, orderId, amount, orderInfo } = req.body;
  return paymentOrder(req, res, { createDate, orderId, amount, orderInfo });
};

const urlReturn =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/order/payment/url_return'
    : process.env.RETURN_URL;

const paymentOrder = async (req, res, params) => {
  const session = await startSession();

  try {
    let { createDate, orderId, amount, orderInfo } = params;

    let _update = {
      orderInfo, // _id
      orderCreated: createDate,
      orderId,
      amount,
    };

    // Start Transaction
    session.startTransaction();

    await Order.findOneAndUpdate({ _id: orderInfo }, _update, { session, new: true });

    let vnp_Params = getVpnParams(req, params);

    var vnpUrl = process.env.VNPAY_URL;

    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ status: 200, url: vnpUrl });
  } catch (err) {
    console.log('paymentOrder', err);

    await session.abortTransaction();
    session.endSession();

    return errHandler(err, res);
  }
};

exports.getUrlReturn = async (req, res) => {
  console.log(req.query, ' Get URL Return');
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
      ? `http://localhost:3000/user/order?`
      : `https://app.thanhlapcongtyonline.vn/user/order?`;

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

      console.log('updated Success');

      let _order = await Order.findOne({ _id: req.query.vnp_OrderInfo }).populate('orderOwner', '_id name email');

      console.log(_order);

      let params = {
        email: _order?.orderOwner?.email || 'handgod1995@gmail.com',
        subject: 'Thông tin thanh toán',
        content: `Chào ${_order?.orderOwner?.name},<br /> Quý khách đã thanh toán thành công. Thông tin giấy tờ sẽ được gửi sớm nhất có thể, quý khách vui lòng đợi trong giây lát.<br/> Xin cảm ơn`,
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
};

exports.checkStatus = async (req, res) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  var config = require('config');

  var secretKey = config.get('vnp_HashSecret');

  var querystring = require('qs');

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var crypto = require('crypto');

  var hmac = crypto.createHmac('sha512', secretKey);

  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    var orderId = vnp_Params['vnp_TxnRef'];
    var rspCode = vnp_Params['vnp_ResponseCode'];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: '00', Message: 'success' });
  } else {
    res.status(200).json({ RspCode: '97', Message: 'Fail checksum' });
  }
};
