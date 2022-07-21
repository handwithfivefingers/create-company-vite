const { Order, Setting } = require('../../model');

const libre = require('libreoffice-convert');

const { sendmailWithAttachments } = require('../sendmail');

const { errHandler } = require('../../response');

const { flattenObject, convertFile, removeListFiles } = require('./../../common/helper');
const { uniqBy } = require('lodash');

libre.convertAsync = require('util').promisify(libre.convert);

exports.checkingOrder = async (req, res) => {
  if (process.env.NODE_ENV !== 'development') return res.status(200).json({ message: 'ngonnn' });
  try {
    // let _order = await Order.findOne({ $and: [{ payment: 1, send: 0 }] }).populate("orderOwner", "email");

    let _order = await Order.findOne({ _id: '62cc52eb1067ba620909f03c' }).populate('orderOwner', 'email');

    console.log('coming', _order);

    if (_order) return handleConvertFile(_order, req, res);

    return res.status(200).json({ data: [] });
  } catch (err) {
    console.log('checkingOrder err');

    return errHandler(err, res);
  }
};

const handleConvertFile = async (order, req, res) => {
  // handle Single File
  let attachments = [];
  try {
    let { files, data } = order;
    let mailParams = await getMailContent(order);
    files = uniqBy(files, 'name').filter((item) => item);

    if (files) {
      let _contentOrder = flattenObject(data);

      console.log(_contentOrder);

      for (let file of files) {
        // console.log("start");

        let pdfFile = await convertFile(file, _contentOrder);

        // console.log("pdfFile", pdfFile);

        attachments.push({ pdfFile, name: file.name });
      }

      mailParams.filesPath = attachments;

      // console.log("mailParams", mailParams);

      await sendmailWithAttachments(req, res, mailParams);

      return res.status(200).json({ message: 'ok' });
    }

    return res.status(400).json({
      error: 'Files not found',
    });
  } catch (err) {
    console.log('handleConvertFile error');

    attachments.length > 0 && (await removeListFiles(attachments, true));

    return errHandler(err, res);
  } finally {
    await removeListFiles(attachments);
  }
};

const getMailContent = async (order) => {
  let _setting = await Setting.find().populate('mailRegister mailPayment'); // -> _setting
  let mailParams;
  mailParams = {
    email: 'handgod1995@gmail.com',
    removeFiles: true,
    send: 1,
    _id: order._id,
    type: 'path',
  };
  if (_setting) {
    let { mailPayment } = _setting[0];
    let { subject, content } = mailPayment;
    mailParams.subject = subject;
    mailParams.content = content;
    mailParams.email = order.orderOwner?.email;
  } else {
    mailParams.subject = 'Testing auto generate files';
    mailParams.content = 'Testing auto generate files';
  }
  return mailParams;
};
