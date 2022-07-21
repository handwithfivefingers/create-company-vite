// import User from "./../model/user";

const { Product, Category, Career } = require('./../model');
const { updatedHandler, errHandler, successHandler } = require('../response');
const lodash = require('lodash');
const slugify = require('slugify');
exports.createProduct = async (req, res) => {
  try {
    const obj = {
      name: req.body.name.toString(),
      price: Number(req.body.price),
      slug: slugify(req.body.name),
      categories: req.body.categories,
      type: req.body.type,
    };

    if (req.body.parentId) {
      obj.parentId = req.body.parentId;
    }

    let product = await Product.findOne({
      name: req.body.name,
    });

    if (product) return errHandler(product, res);

    const _product = new Product(obj);

    await _product.save();

    return successHandler('', res);
  } catch (err) {
    console.log('createProduct error', err);
    return errHandler(err, res);
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const obj = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      categories: req.body.categories,
    };

    if (req.body.parentId) {
      obj.parentId = req.body.parentId;
    }

    const product = await Product.updateOne(
      {
        _id: id,
      },
      obj,
      { new: true }
    );

    return updatedHandler(product, res);
  } catch (err) {
    console.log('editProduct error');
    return errHandler(err, res);
  }
};

exports.fetchProduct = async (req, res) => {
  try {
    let _product = await Product.find({}).populate('categories', 'name').populate('parentId', 'name');
    let newData = filterData(_product);
    let lastData = filterCaregories(newData);
    return successHandler(lastData, res);
  } catch (err) {
    console.log('fetchProduct error');
    return errHandler(err, res);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req);
    // return;
    await Product.findOneAndDelete({
      _id: id,
    });

    return res.status(200).json({ message: 'Xóa sản phẩm thành công', status: 200 });
  } catch (err) {
    console.log('deleteProduct error');
    return errHandler(err, res);
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    let _cate = await Category.findOne({ slug: req.params.slug });

    let _product = await Product.find({
      categories: {
        $in: [_cate._id],
      },
    }).populate('categories');

    let newData = filterData(_product);

    let lastData = filterCaregories(newData);

    return successHandler(lastData, res, _cate);
  } catch (err) {
    console.log('getProductBySlug error');

    return errHandler(err, res);
  }
};

const filterData = (data = null) => {
  if (data) {
    return data.map((item) => ({
      name: item.name,
      price: item?.price,
      type: item?.type,
      _id: item?._id,
      slug: item?.slug,
      categories: filterData(item?.categories),
      parentId: item?.parentId || [],
    }));
  } else return null;
};

const filterCaregories = (prevData) => {
  let data = [];

  let parent;
  let children;

  parent = prevData.filter((item) => item.parentId.length == 0);
  children = prevData.filter((item) => item.parentId.length > 0);

  for (let p of parent) {
    data.push({
      name: p?.name,
      price: p?.price,
      type: p?.type,
      _id: p?._id,
      slug: p?.slug,
      categories: p?.categories,
      children: [],
    });
  }

  if (children.length > 0) {
    children.map((child) => {
      const current = handleCheckChildren(child, data);
      data = current;
    });
  }
  return data;
};

const handleCheckChildren = (child, data) => {
  return data.map((item) => {
    if (lodash.some(child.parentId, { _id: item._id })) {
      item.children.push({ ...child });
      return item;
    } else {
      return item;
    }
  });
};
