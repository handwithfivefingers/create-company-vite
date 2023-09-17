const {
  existHandler,
  successHandler,
  errHandler,
  deletedHandler,
  updatedHandler,
  createdHandler,
} = require('@response')
const { TemplateMail } = require('@model')
const _ = require('lodash')

module.exports = class TemplateService {
  PAGE_SIZE = 10

  constructor() {}

  onGetTemplate = async (req, res) => {
    const { page, get } = req.query

    let current_page = (Number(page) - 1) * this.PAGE_SIZE

    try {
      let _template = []
      let count = await TemplateMail.countDocuments()

      if (page) {
        _template = await TemplateMail.find({})
          .select('_id name content subject')
          .skip(current_page)
          .limit(this.PAGE_SIZE)
          .sort('-createdAt')
      } else {
        _template = await TemplateMail.find({}).select('_id name content subject').sort('-createdAt')
      }
      // return successHandler({ _template, count }, res)
      return { _template, count }
    } catch (err) {
      // return errHandler(err, res)
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
