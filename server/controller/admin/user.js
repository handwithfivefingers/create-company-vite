const { User } = require("../../model");
const { successHandler, errHandler, deletedHandler } = require("../../response");

exports.fetchUser = async (req, res) => {
  let _user = [];

  _user = await User.find({}).select("-hash_password").sort("-createdAt");

  let count = await User.countDocuments();

  try {
    return successHandler({ _user, count }, res);
  } catch (e) {
    return errHandler(e, res);
  }
};

exports.deleteUser = async (req, res) => {
  let { id } = req.params;

  try {
    let _user = await User.findOneAndDelete({ _id: id });
    if (_user) return deletedHandler(_user, res);
  } catch (err) {
    console.log(err);
    return errHandler(err, res);
  }
};
