const { User } = require("../model");
const { successHandler, errHandler } = require("../response");

exports.fetchUser = async (req, res) => {
  try {
    let _user = await User.find({}).select("-hash_password").sort("-createdAt");

    let count = await User.countDocuments();

    return successHandler({ _user, count }, res);
  } catch (e) {
    console.log("fetchUser error");
    return errHandler(e, res);
  }
};
