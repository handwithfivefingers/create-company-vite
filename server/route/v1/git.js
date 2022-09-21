const express = require('express')

const router = express.Router()

const GitAction = require('@controller/Service/Git')

const GitService = new GitAction()

router.post('/pull', GitService.gitPull)

module.exports = router
