const { Product, Category } = require('@model')
const { successHandler, errHandler } = require('@response')
const slugify = require('slugify')
module.exports = class ProductAdmin {
  getProduct = async (req, res) => {
    try {
      let { _id } = req.params // _id Category

      let _product = await Product.find({}).populate('categories')

      return successHandler(_product, res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  getSingleProduct = async (req, res) => {
    try {
    } catch (error) {}
  }

  createProduct = async (req, res) => {
    try {
      const obj = {
        name: req.body.name.toString(),
        price: Number(req.body.price),
        slug: slugify(req.body.name),
        categories: req.body.categories,
        type: req.body.type,
      }

      let product = await Product.findOne({
        name: req.body.name,
      })

      if (product) throw { message: 'Product already exists' }

      const _product = new Product(obj)

      await _product.save()

      return successHandler([], res)
    } catch (err) {
      console.log('createProduct error', err)
      return errHandler(err, res)
    }
  }

  updateProduct = async (req, res) => {
    try {
      let { _id } = req.params

      let { categories, name, price, type } = req.body

      // if (!categories) throw { message: 'No categories provided' }

      let _update = {
        name,
        price,
        type,
        categories,
      }

      await Product.updateOne({ _id }, _update, { new: true })

      return res.status(200).json({
        message: ' ok',
      })
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { _id } = req.params

      // return;
      await Product.findOneAndDelete({
        _id,
      })

      return res.status(200).json({ message: 'Xóa sản phẩm thành công', status: 200 })
    } catch (err) {
      console.log('deleteProduct error')

      return errHandler(err, res)
    }
  }

  filterProductCate = (cate) => {
    let res = []

    res = cate.reduce((result, current) => {
      let [parent, child] = current

      if (child) {
        let index = result.findIndex((item) => item._id === parent)

        if (index !== -1) {
          result[index].child = [...result[index].child, { _id: child }]
        } else {
          result = [...result, { _id: parent, child: [{ _id: child }] }]
        }
      } else {
        result = [...result, { _id: parent }]
      }

      return [...result]
    }, [])

    return res
  }
}
