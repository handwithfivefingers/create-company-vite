const { existHandler, successHandler, errHandler, permisHandler, deletedHandler } = require('../../../response')
const { TemplateMail } = require('../../../model')
const _ = require('lodash')

module.exports = class TemplateAdmin {
  PAGE_SIZE = 10

  constructor() {}

  fetchTemplate = async (req, res) => {
    const { page, get } = req.query

    let current_page = (Number(page) - 1) * this.PAGE_SIZE

    try {
      let _template = []
      let count = await TemplateMail.countDocuments()

      if (page) {
        _template = await TemplateMail.find({}).select('_id name content subject').skip(current_page).limit(this.PAGE_SIZE).sort('-createdAt')
      } else {
        _template = await TemplateMail.find({}).select('_id name content subject').sort('-createdAt')
      }
      return successHandler({ _template, count }, res)
    } catch (err) {
      return errHandler(err, res)
    }
  }

  createTemplate = async (req, res) => {
    try {
      let _exist = await TemplateMail.findOne({ name: req.body.name })

      if (_exist) {
        return existHandler(res)
      }

      let _template = new TemplateMail({
        name: req.body.name,
        content: req.body.content,
        subject: req.body.subject,
      })

      let _save = await _template.save()

      return createdHandler(_save, res)
    } catch (e) {
      return errHandler(e, res)
    }
  }

  editTemplate = async (req, res) => {
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

      return updatedHandler(_updated, res)
    } catch (e) {
      return errHandler(e, res)
    }
  }

  deleteTemplate = async (req, res) => {
    let { id } = req.params
    try {
      await TemplateMail.findOneAndDelete({ _id: id })
      return deletedHandler(_, res)
    } catch (e) {
      return errHandler(e, res)
    }
  }
}
