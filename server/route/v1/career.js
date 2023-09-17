const express = require('express')
const router = express.Router()
const { caching, cachingGroup } = require('@middleware/cache')

const CareerController = require('@controller/v1/user/career.controller')

router.get('/', caching('1 day'), cachingGroup, new CareerController().onHandleGetCareer)

module.exports = router
