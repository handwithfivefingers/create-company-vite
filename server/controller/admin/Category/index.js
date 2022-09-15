const { Product, Category, Career } = require('@model')
const { errHandler, successHandler } = require('@response')
const { default: slugify } = require('slugify')
// Fetch data
const { equals, default: mongoose } = require('mongoose')

module.exports = class CategoryAdmin {
  createCategory = async (req, res) => {
    try {
      let { name, parentCategory, type, price, slug } = req.body
      let cateObj = {
        name,
        price,
        slug: slugify(req.body.name),
        type,
        parentCategory,
      }

      const _cateObj = new Category(cateObj)

      await _cateObj.save()

      return successHandler(cateObj, res)
    } catch (error) {
      console.log(error)

      return errHandler(error, res)
    }
  }

  getCategory = async (req, res) => {
    try {
      let _cate = await Category.find({})
      let data = await this.filterCate(_cate)

      return successHandler(data, res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  updateCategory = async (req, res) => {
    try {
      let { _id } = req.params

      let { name, type, price, parentCategory } = req.body

      let _update = {
        name,
        type,
        price,
        parentCategory,
      }

      await Category.updateOne({ _id }, _update, { new: true })

      return successHandler('Updated successfully', res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  hardDelete = async (req, res) => {
    try {
      let { _id } = req.params
      await Category.findOneAndDelete({ _id })

      return successHandler('Delete Success', res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  softDelete = async (req, res) => {
    try {
      await Category.updateOne({ _id: req.body._id }, { delete_flag: 1 })
      return successHandler('Delete Success', res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  filterCate = async (cate) => {
    let parent = cate.filter((item) => !item.parentCategory)

    let child = cate.filter((item) => item.parentCategory)

    let result = []

    result = parent.reduce((result, current) => {
      let item = child.filter((item) => current._id.equals(item.parentCategory))

      if (item) {
        let children = item.map(({ _doc }) => _doc)
        current = {
          ...current._doc,
          children,
        }
      }

      return [...result, current]
    }, [])

    return result
  }

  backupData = [
    {
      _id: '62248950c5533d9f6887e85a',
      name: 'Thành lập doanh nghiệp mới',
      price: '500000',
      slug: 'thanh-lap-doanh-nghiep',
      type: 1,
    },
    {
      _id: '6224bdfbc5533d9f6887e868',
      name: 'Thay đổi thông tin giấy phép',
      price: '500000',
      slug: 'thay-doi-thong-tin',
      type: 2,
    },
    {
      _id: '6224be3cc5533d9f6887e871',
      name: 'Thông báo tạm ngừng kinh doanh',
      price: '500000',
      slug: 'tam-ngung',
      type: 3,
    },
    {
      _id: '6224be55c5533d9f6887e876',
      name: 'Thông báo giải thể doanh nghiệp',
      price: '500000',
      slug: 'giai-the',
      type: 4,
    },
    {
      _id: '6320af66b7622a682cdbdfe9',
      name: 'Công ty TNHH 1 thành viên',
      price: '500000',
      slug: 'cong-ty-tnhh-1-thanh-vien',
      type: 1,
      parentCategory: '62248950c5533d9f6887e85a',
    },
    {
      _id: '6320af92b7622a682cdbdffc',
      name: 'Công ty TNHH 2 thành viên trở lên',
      price: '500000',
      slug: 'cCong-ty-tnhh-2-thanh-vien-tro-len',
      type: 2,
      parentCategory: '62248950c5533d9f6887e85a',
    },
    {
      _id: '6320afcab7622a682cdbe006',
      name: 'Công ty cổ phần',
      price: '500000',
      slug: 'cong-ty-co-phan',
      type: 3,
      parentCategory: '62248950c5533d9f6887e85a',
    },
  ]
  data = [
    {
      _id: '62248950c5533d9f6887e85a',
      name: 'Thành lập doanh nghiệp mới',
      price: '500000',
      slug: 'thanh-lap-doanh-nghiep',
      type: 1,
    },
    {
      _id: '6320af66b7622a682cdbdfe9',
      name: 'Công ty TNHH 1 thành viên',
      price: '500000',
      slug: 'cong-ty-tnhh-1-thanh-vien',
      type: 1,
      parentCategory: '62248950c5533d9f6887e85a',
    },
    {
      _id: '6320af92b7622a682cdbdffc',
      name: 'Công ty TNHH 2 thành viên trở lên',
      price: '500000',
      slug: 'cCong-ty-tnhh-2-thanh-vien-tro-len',
      type: 2,
      parentCategory: '62248950c5533d9f6887e85a',
    },
    {
      _id: '6320afcab7622a682cdbe006',
      name: 'Công ty cổ phần',
      price: '500000',
      slug: 'cong-ty-co-phan',
      type: 3,
      parentCategory: '62248950c5533d9f6887e85a',
    },
    {
      _id: '6224bdfbc5533d9f6887e868',
      name: 'Thay đổi thông tin giấy phép',
      price: '500000',
      slug: 'thay-doi-thong-tin',
      type: 2,
    },
    {
      _id: '6320b700b850880dac3b2910',
      name: 'Công ty TNHH 1 thành viên',
      price: '500000',
      slug: 'Cong-ty-TNHH-1-thanh-vien',
      type: 1,
      parentCategory: '6224bdfbc5533d9f6887e868',
    },
    {
      _id: '6320b708b850880dac3b2913',
      name: 'Công ty TNHH 2 thành viên trở lên',
      price: '500000',
      slug: 'Cong-ty-TNHH-2-thanh-vien-tro-len',
      type: 2,
      parentCategory: '6224bdfbc5533d9f6887e868',
    },
    {
      _id: '6320b711b850880dac3b2917',
      name: 'Công ty cổ phần',
      price: '500000',
      slug: 'Cong-ty-co-phan',
      type: 3,
      parentCategory: '6224bdfbc5533d9f6887e868',
    },
    {
      _id: '6224be3cc5533d9f6887e871',
      name: 'Thông báo tạm ngừng kinh doanh',
      price: '500000',
      slug: 'tam-ngung',
      type: 3,
    },
    {
      _id: '6320b71bb850880dac3b291a',
      name: 'Công ty TNHH 1 thành viên',
      price: '500000',
      slug: 'Cong-ty-TNHH-1-thanh-vien',
      type: 1,
      parentCategory: '6224be3cc5533d9f6887e871',
    },
    {
      _id: '6320b722b850880dac3b291d',
      name: 'Công ty TNHH 2 thành viên trở lên',
      price: '500000',
      slug: 'Cong-ty-TNHH-2-thanh-vien-tro-len',
      type: 2,
      parentCategory: '6224be3cc5533d9f6887e871',
    },
    {
      _id: '6320b729b850880dac3b2920',
      name: 'Công ty cổ phần',
      price: '500000',
      slug: 'Cong-ty-co-phan',
      type: 3,
      parentCategory: '6224be3cc5533d9f6887e871',
    },
    {
      _id: '6224be55c5533d9f6887e876',
      name: 'Thông báo giải thể doanh nghiệp',
      price: '500000',
      slug: 'giai-the',
      type: 4,
    },
    {
      _id: '6320b734b850880dac3b2923',
      name: 'Công ty TNHH 1 thành viên',
      price: '500000',
      slug: 'Cong-ty-TNHH-1-thanh-vien',
      type: 1,
      parentCategory: '6224be55c5533d9f6887e876',
    },
    {
      _id: '6320b739b850880dac3b2926',
      name: 'Công ty TNHH 2 thành viên trở lên',
      price: '500000',
      slug: 'Cong-ty-TNHH-2-thanh-vien-tro-len',
      type: 2,
      parentCategory: '6224be55c5533d9f6887e876',
    },
    {
      _id: '6320b740b850880dac3b2929',
      name: 'Công ty cổ phần',
      price: '500000',
      slug: 'Cong-ty-co-phan',
      type: 3,
      parentCategory: '6224be55c5533d9f6887e876',
    },
  ]

  reforceCategoriesData = async (req, res) => {
    try {
      await Category.deleteMany({})

      await Category.insertMany(this.data)

      let data = await Category.find({})

      return res.status(200).json({ data })
    } catch (err) {
      console.log(err)
    } finally {
    }
  }
}

// backup

// "data":
