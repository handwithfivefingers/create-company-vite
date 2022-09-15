const { Product, Category } = require('@model')
const { successHandler, errHandler } = require('@response')

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
    } catch (error) {}
  }

  updateProduct = async (req, res) => {
    try {
      let { _id } = req.params

      let { categories, name, price, type } = req.body

      if (!categories) throw { message: 'No categories provided' }

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
    } catch (error) {}
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
