const express = require("express");

const { upload, requireSignin } = require("../middleware");

const { settingTemplateMail, getSettingMail } = require("../controller/setting");

const router = express.Router();

router.post("/email/setting", requireSignin, settingTemplateMail);

router.get("/email/setting", requireSignin, getSettingMail);

module.exports = router;
