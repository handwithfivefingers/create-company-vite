const express = require("express");

const { upload, requireSignin } = require("../middleware/index");
const { sendmailWithAttachments } = require("../controller/sendmail");
const { testPayment, getUrlReturn } = require("../controller/service/payment");
const { checkingOrder } = require("../controller/service/ReadAndWrite");
const router = express.Router();

router.post("/sendmail", upload.array("attachments", 5), sendmailWithAttachments);

router.post("/payment", requireSignin, upload.none(), testPayment);

router.get("/return_vnp", requireSignin, upload.none(), getUrlReturn);

router.post("/service/order", checkingOrder);

module.exports = router;
