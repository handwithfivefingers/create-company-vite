const express = require('express')

const router = express.Router()

const GitService = require('../../controller/Service/Git')

const GitAction = new GitService()

router.post('/pull', GitAction.gitAction)

module.exports = router
