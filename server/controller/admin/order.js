const { existHandler, successHandler, errHandler, permisHandler, deletedHandler } = require("../../response");
const { Order, Product, User } = require("../../model");
const _ = require("lodash");

const PAGE_SIZE = 10;

exports.getOrderBySlug = async (req, res) => {
  const { id } = req.params;
  if (req.role === "admin") {
    try {
      const _order = await Order.findById(id)
        .populate("products", "name type")
        .populate("data.create_company.main_career", ["name", "code"]);
      return successHandler(_order, res);
    } catch (err) {
      console.log("getOrderBySlug error");

      return errHandler(err, res);
    }
  }
  return permisHandler(res);
};

exports.getOrders = async (req, res) => {
  const { page, ...condition } = req.body;

  let current_page = (parseInt(page) - 1) * PAGE_SIZE;

  const email = new RegExp(condition?.name, "i");

  try {
    let _user = await User.find({
      $and: [
        {
          email: email,
          // role: "User",
        },
      ],
    }).select("_id");

    let newCondition = _user.map((item) => ({ orderOwner: item._id }));

    if (req.role === "admin") {
      let _order = await Order.find({
        $or: newCondition.length > 0 ? newCondition : [{}],
      })
        .populate("main_career", ["name", "code"])
        // .populate("opt_career", ["name", "code"])
        .populate("products", "name")
        .populate({
          path: "orderOwner",
          select: "name email",
        })
        .skip(current_page)
        .limit(PAGE_SIZE)
        .sort("-createdAt");

      const count = await Order.find({
        $or: newCondition.length > 0 ? newCondition : [{}],
      }).countDocuments();

      return successHandler({ _order, count, current_page: page || 1 }, res);
    }
    return permisHandler(res);
  } catch (err) {
    console.log("getOrders error");

    return errHandler(err, res);
  }
};

exports.deleteOrder = async (req, res) => {
  let { id } = req.params;
  try {
    await Order.findOneAndDelete({ _id: id });

    return deletedHandler(_, res);
  } catch (err) {
    console.log("deleteOrder error");

    return errHandler(err, res);
  }
};

const calcPrice = async (productArray) => {
  // console.log(productArray);
  if (typeof productArray === "string") {
    let _product = await Product.findOne({ _id: productArray }).select("_id price");
    // console.log(_product);
    return _product.price;
  }

  let allProduct = productArray?.map(async (_id) => {
    let _product = await Product.findOne({ _id: _id }).select("_id price");
    return _product;
  });

  return await Promise.all(allProduct)
    .then((res) => res.reduce((prev, current) => (prev += current.price), 0))
    .catch((err) => console.log(err));
};
