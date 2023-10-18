const express = require('express');
const PuppeteerController = require('../controller/puppeteer.controller');
const router = express.Router()
router.post('/service/search',  new PuppeteerController().onSearch)
module.exports = router