const fs = require('fs');
const { Log } = require('./../model');
const loginFailed = (res) => {
  return res.status(400).json({
    message: 'Sai tài khoản hoặc mật khẩu!',
    success: false,
    status: 400,
  });
};

const authFailedHandler = (res) => {
  return res.status(200).json({
    message: 'Authorization required',
    success: false,
    status: 401,
  });
};

const errHandler = async (err, res) => {
  let message = 'Đã có lỗi xảy ra, vui lòng thử lại sau!';

  let error = { error: err, message };

  await createLog(error);

  return res.status(400).json({
    ...error,
    status: 400,
    success: false,
  });
};

const successHandler = (data, res, props = null) => {
  return res.status(200).json({
    data,
    message: 'Thành công',
    status: 200,
    success: true,
    type: props?.type,
  });
};

const updatedHandler = (data, res) => {
  return res.status(200).json({
    data,
    message: 'Cập nhật thành công',
    status: 200,
    success: true,
  });
};

const createdHandler = (data, res) => {
  return res.status(200).json({
    data,
    message: 'Tạo thành công',
    status: 201,
    success: true,
  });
};

const deletedHandler = (data, res) => {
  return res.status(200).json({
    // data,
    message: 'Xóa thành công',
    status: 200,
    success: true,
  });
};

const existHandler = async (res, message = null) => {
  let newMessage = ` ${message || 'Data'} đã tồn tại, vui lòng thử lại`;

  await createLog({ message: newMessage });

  return res.status(200).json({
    message: newMessage,
    success: false,
    status: 400,
  });
};

const permisHandler = async (res) => {
  let message = 'Không có quyền truy cập';

  await createLog({ message });

  return res.status(200).json({
    message,
    success: false,
    status: 401,
  });
};

const removeFile = async (pathName) => {
  fs.stat(pathName, function (err, stats) {
    if (err) {
      return err;
    }
    fs.unlink(pathName, function (err) {
      if (err) return err;
      return 'Deleted Successfully';
    });
  });
};

const createLog = async ({ error = null, message }) => {
  const obj = {
    error: {
      error,
      message,
    },
  };

  const _err = new Log(obj);

  await _err.save();
};

module.exports = {
  loginFailed,
  authFailedHandler,
  errHandler,
  successHandler,
  updatedHandler,
  createdHandler,
  deletedHandler,
  existHandler,
  permisHandler,
  removeFile,
  createLog,
};
