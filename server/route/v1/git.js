const express = require('express');

const router = express.Router();

const { gitAction } = require('@server/controller/Service');

router.post('/pull', gitAction);

module.exports = router;
