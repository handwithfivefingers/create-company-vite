const express = require("express");
const { upload, requireSignin } = require("../../middleware/index");
const { fetchTemplate, editTemplate, createTemplate, deleteTemplate } = require("../../controller/admin/template");
const router = express.Router();

router.get("/admin/template", requireSignin, upload.none(), fetchTemplate);

router.post("/admin/template", requireSignin, upload.none(), createTemplate);

router.post("/admin/template/edit/:id", requireSignin, upload.none(), editTemplate);

router.post("/admin/template/delete/:id", requireSignin, upload.none(), deleteTemplate);

// router.get("//:id", requireSignin, getOrderBySlug);
module.exports = router;
