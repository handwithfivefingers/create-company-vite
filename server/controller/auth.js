// import User from "./../model/user";
const { User, Setting } = require("./../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginFailed, createdHandler, errHandler, existHandler } = require("../response");

const { sendmailWithAttachments } = require("./sendmail");

exports.registerUser = async (req, res) => {
  try {
    let _user = await User.findOne({ $and: [{ email: req.body.email }, { phone: req.body.phone }] });

    let message = _user?.phone === req.body.phone ? "Phone" : "Email"; // if have user -> check mail or phone

    if (_user) return existHandler(res, message);

    const { phone, name, email } = req.body;

    var password = Math.random().toString(36).slice(-8);

    const hash_password = await bcrypt.hash(password, 10);

    const _obj = new User({
      phone,
      name,
      email,
      hash_password,
    });

    const _save = await _obj.save();

    const { email: _email, role, _id } = _save;

    let _tokenObj = { _id, role };

    await generateToken(_tokenObj, res);

    let mailParams = await getMailParams({ name, phone, password, role, email: _email }, res);

    // console.log("mailParams", mailParams);

    await sendmailWithAttachments(req, res, mailParams);

    return res.status(201).json({
      role,
      message: "Đăng kí thành công",
    });
  } catch (err) {
    console.log("Register Error");
    return errHandler(err, res);
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const resp = await User.findOne({ phone: req.body.phone });

    if (resp) {
      const auth = await resp.authenticate(req.body.password);

      if (auth) {
        let _tokenObj = { _id: resp._id, role: resp.role };

        await generateToken(_tokenObj, res);

        let newData = {
          _id: resp._id,
          name: resp.name,
          email: resp.email,
          phone: resp.phone,
          role: resp.role,
        };

        return res.status(200).json({
          data: newData,
          authenticate: true,
          callbackUrl: `/${newData.role}`,
        });
      }
    }
    return loginFailed(res);
  } catch (err) {
    console.log("LoginUser error");
    return errHandler(err, res);
  }
};

exports.Logout = async (req, res) => {
  // console.log("running api logout");
  res.clearCookie("create-company-token");
  res.status(200).json({
    authenticate: false,
  });
};

exports.authenticate = async (req, res) => {
  // console.log(req.role);
  return res.status(200).json({
    authenticate: true,
    role: req.role,
  });
};

const generateToken = async (obj, res) => {
  const token = await jwt.sign(obj, process.env.SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
  var hour = 3600000;

  res.cookie("create-company-token", token, {
    maxAge: 2 * 24 * hour,
    httpOnly: true,
  });
};

const getMailParams = async ({ name, phone, password, role, email }, res) => {
  try {
    let _setting = await Setting.find().populate("mailRegister mailPayment");

    let mailParams = {
      phone,
      email,
      role,
      type: "any",
    };

    if (_setting) {
      let { mailRegister } = _setting[0];

      let { subject, content } = mailRegister;

      mailParams.content = content.replace("{name}", name).replace("{phone}", phone).replace("{password}", password);
      mailParams.subject = subject;
    } else {
      mailParams.content = `Chào ${name}, <br/>Tên đăng nhập của bạn là: ${phone}<br/>Mật khẩu của bạn là : ${password}`;
      mailParams.subject = "Create user Successfully";
    }

    return mailParams;
  } catch (err) {
    // throw err;
    return errHandler(err, res);
  }
};
