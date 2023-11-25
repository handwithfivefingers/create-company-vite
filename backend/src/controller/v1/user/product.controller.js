const { errHandler, successHandler } = require('../../../response')
const ProductService = require('../../../service/v1/user/product.service')

module.exports = class ProductController {
  onGetProduct = async (req, res) => {
    try {
      const data = await new ProductService().getProduct(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onUpdateProduct = async (req, res) => {
    try {
      const data = await new ProductService().editProduct(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onCreateProduct = async (req, res) => {
    try {
      const data = await new ProductService().createProduct(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onDeleteProduct = async (req, res) => {
    try {
      const data = await new ProductService().deleteProduct(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onGetProductBySlug = async (req, res) => {
    try {
      const data = await new ProductService().getProductBySlug(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
