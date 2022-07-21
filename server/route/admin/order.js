const express = require("express");

const { upload, requireSignin } = require("../../middleware/index");

const { getOrderBySlug, getOrders , deleteOrder} = require("../../controller/admin/order");

const router = express.Router();

// Admin Router
router.get("/order/:id", requireSignin, upload.none(), getOrderBySlug);

router.post("/order", requireSignin, upload.none(), getOrders);

router.post("/order/delete/:id", requireSignin, upload.none(), deleteOrder);

module.exports = router;
