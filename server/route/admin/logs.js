const express = require("express");
const { upload, requireSignin } = require("../../middleware/index");
const { getLogs } = require("../../controller/admin/logs");

const router = express.Router();

//Get
router.get("/logs", requireSignin, upload.none(), getLogs);

module.exports = router;
