const { permisHandler, errHandler } = require("../response");
const { Setting } = require("../model");

exports.settingTemplateMail = async (req, res) => {
  try {
    let { mailRegister, mailPayment } = req.body;
    let _setting = await Setting.findOne({
      userOwner: req.id,
    });
    let data;
    if (_setting) {
      data = await Setting.updateOne({ userOwner: req.id }, { mailRegister, mailPayment }, { new: true });
    } else {
      let _obj = new Setting({
        mailRegister,
        mailPayment,
        userOwner: req.id,
      });
      data = await _obj.save();
    }

    return res.status(200).json({
      message: "Cài đặt thành công",
      data,
    });
  } catch (err) {
    console.log("settingTemplateMail error");

    return errHandler(err, res);
  }
};

exports.getSettingMail = async (req, res) => {
  if (req.role !== "admin") return permisHandler(res);
  try {
    let _setting = await Setting.findOne({ userOwner: req.id }).populate("mailRegister mailPayment");
    // console.log(_setting);
    return res.status(200).json({
      message: "ok",
      data: _setting,
    });
  } catch (err) {
    console.log("getSettingMail error");
    return errHandler(err, res);
  }
};
