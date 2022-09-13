const express = require('express')
const { upload, requireSignin } = require('@middleware')
// const { getCategories, updateCate } = require('../controller')

const router = express.Router()
const CategoryClass = require('@controller/user/Category')
const CategoryAdmin = require('@controller/admin/Category')

const { getCategories, updateCate } = new CategoryClass()

const { createCategory, getCategory, hardDelete, updateCategory, reforceCategoriesData } = new CategoryAdmin()
//Get
// router.get('/admin/category', requireSignin, upload.none(), getCategories)

router.get('/category', requireSignin, upload.none(), getCategories)

// router.post('/admin/category/update/:id', requireSignin, upload.none(), updateCate)

router.get('/admin/category', getCategory)

router.post('/admin/category', createCategory)

router.post('/admin/category/:_id', updateCategory)

router.delete('/admin/category/:_id', hardDelete)
    

router.post('/admin/force', reforceCategoriesData)

module.exports = router

/**
 
[
    {
        "_id": "62248950c5533d9f6887e85a",
        "name": "Thành lập doanh nghiệp mới",
        "price": "500000",
        "slug": "thanh-lap-doanh-nghiep",
        "type": 1,
        "children": []
    },
    {
        "_id": "6224bdfbc5533d9f6887e868",
        "name": "Thay đổi thông tin giấy phép",
        "price": "500000",
        "slug": "thay-djoi-thong-tin",
        "type": 2,
        "children": []
    },
    {
        "_id": "6224be3cc5533d9f6887e871",
        "name": "Thông báo tạm ngừng kinh doanh",
        "price": "500000",
        "slug": "tam-ngung",
        "type": 3,
        "children": []
    },
    {
        "_id": "6224be55c5533d9f6887e876",
        "name": "Thông báo giải thể doanh nghiệp",
        "price": "500000",
        "slug": "giai-the",
        "type": 4,
        "children": []
    }
]
 */
