const { User } = require("../../model");
const { successHandler, errHandler } = require("../../response");
const bcrypt = require("bcryptjs");

exports.fetchProfile = async (req, res) => {
  try {
    let _user = await User.findOne({ _id: req.id }).select("-hash_password");

    return successHandler(_user, res);
  } catch (e) {
    console.log("fetchProfile error");
    return errHandler(e, res);
  }
};

exports.changePassword = async (req, res) => {
  try {
    let { old_password, new_password, confirm_password } = req.body;

    if (!old_password) return errHandler("Password must be filled", res);

    if (new_password !== confirm_password) return errHandler("confirm password doesnt match", res);

    let _user = await User.findOne({ _id: req.id });

    let isPassword = await _user.authenticate(old_password);

    if (isPassword) {
      const hash_password = await bcrypt.hash(new_password, 10);

      await User.findOneAndUpdate({ _id: _user._id }, { hash_password }, { new: true });

      return successHandler("Change Password success", res);
    }

    return errHandler("Password doesnt correct, please try again !", res);

  } catch (err) {

    console.log("changePassword error");
    return errHandler(err, res);
    
  }
};
