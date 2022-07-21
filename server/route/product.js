const express = require("express");
const { upload, requireSignin } = require("../middleware/index");
const { getProductBySlug, createProduct, editProduct, fetchProduct, deleteProduct } = require("../controller/product");

const router = express.Router();

// Create
router.post("/product/create", requireSignin, upload.none(), createProduct);

//Edit
router.post("/product/edit/:id", requireSignin, upload.none(), editProduct);

//Get
router.get("/product", requireSignin, upload.none(), fetchProduct);

// Delete
router.delete("/product/:id", requireSignin, upload.none(), deleteProduct);

// get by slug
router.get("/product/:slug", requireSignin, upload.none(), getProductBySlug);

module.exports = router;
