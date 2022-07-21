const express = require('express');
const { upload, requireSignin } = require('../middleware/index');
const { getCategories, updateCate } = require('../controller/category');

const router = express.Router();

//Get
router.get('/admin/category', requireSignin, upload.none(), getCategories);

router.get('/category', requireSignin, upload.none(), getCategories);

router.post('/admin/category/update/:id', requireSignin, upload.none(), updateCate);

// get by ID
// router.get("/product/:id", requireSignin, upload.none(), getProductById);

module.exports = router;
