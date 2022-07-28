const express = require('express');

const router = express.Router();

const { gitAction } = require('../controller/service');

router.post('/pull', gitAction);

module.exports = router;
