const { TemplateMail } = require('../../../model')
const BaseAdminService = require('../../../common/baseService')

const PAGE_SIZE = 10
module.exports = class TemplateService extends BaseAdminService {
  onGetTemplate = async (req, res) => {
    try {
      let _template = []
      let count = await TemplateMail.countDocuments()
      const { page } = req.query
      let current_page = (Number(page) - 1) * PAGE_SIZE
      if (page) {
        _template = await TemplateMail.find({})
          .select('_id name content subject')
          .skip(current_page)
          .limit(PAGE_SIZE)
          .sort('-createdAt')
      } else {
        _template = await TemplateMail.find({}).select('_id name content subject').sort('-createdAt')
      }
      return { _template, count }
    } catch (err) {
      console.log('error', err)
      throw err
    }
  }

  onCreateTemplate = async (req, res) => {
    try {
      let _exist = await TemplateMail.findOne({ name: req.body.name })

      if (_exist) throw { message: 'Trùng tên' }

      let _template = new TemplateMail({
        name: req.body.name,
        content: req.body.content,
        subject: req.body.subject,
      })

      let _save = await _template.save()

      // return createdHandler(_save, res)
      return _save
    } catch (e) {
      console.log(e)
      // return errHandler(e, res)
      throw e
    }
  }

  onUpdateTemplate = async (req, res) => {
    let { id } = req.params
    let _update = {
      name: req.body.name,
      content: req.body.content,
      subject: req.body.subject,
    }

    try {
      let _updated = await TemplateMail.updateOne({ _id: id }, _update, {
        new: true,
      })

      // return updatedHandler(_updated, res)
      return _updated
    } catch (e) {
      console.log('error', e)
      // return errHandler(e, res)
      throw e
    }
  }

  onDeleteTemplate = async (req, res) => {
    let { id } = req.params
    try {
      await TemplateMail.findOneAndDelete({ _id: id })
      // return deletedHandler(_, res)
      return true
    } catch (e) {
      // return errHandler(e, res)
      throw e
    }
  }
}
