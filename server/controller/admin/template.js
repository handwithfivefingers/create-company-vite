const {
  errHandler,
  successHandler,
  createdHandler,
  existHandler,
  updatedHandler,
  deletedHandler,
} = require("../../response");
const { TemplateMail } = require("../../model");
const _ = require("lodash");

const PAGE_SIZE = 10;

exports.fetchTemplate = async (req, res) => {
  const { page, get } = req.query;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;
  let _template = [];

  let count = await TemplateMail.countDocuments();

  try {
    if (page) {
      _template = await TemplateMail.find({})
        .select("_id name content subject")
        .skip(current_page)
        .limit(PAGE_SIZE)
        .sort("-createdAt");
    } else {
      _template = await TemplateMail.find({}).select("_id name content subject").sort("-createdAt");
    }
    return successHandler({ _template, count }, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.createTemplate = async (req, res) => {
  try {
    let _exist = await TemplateMail.findOne({ name: req.body.name });
    if (_exist) {
      return existHandler(res);
    }
  } catch (e) {
    return errHandler(e, res);
  }

  let _template = new TemplateMail({
    name: req.body.name,
    content: req.body.content,
    subject: req.body.subject,
  });

  try {
    let _save = await _template.save();
    return createdHandler(_save, res);
  } catch (e) {
    return errHandler(e, res);
  }
};

exports.editTemplate = async (req, res) => {
  let { id } = req.params;
  let _update = {
    name: req.body.name,
    content: req.body.content,
    subject: req.body.subject,
  };

  try {
    let _updated = await TemplateMail.updateOne({ _id: id }, _update, { new: true });

    return updatedHandler(_updated, res);
  } catch (e) {
    return errHandler(e, res);
  }
};

exports.deleteTemplate = async (req, res) => {
  let { id } = req.params;
  try {
    await TemplateMail.findOneAndDelete({ _id: id });
    return deletedHandler(_, res);
  } catch (e) {
    return errHandler(e, res);
  }
};
