const express = require('express');
const { upload, requireSignin } = require('./../middleware');
const { fetchUser, deleteUser } = require('../controller/admin');
const { fetchProfile, changePassword } = require('../controller/user/index');
const router = express.Router();

router.post('/admin/user', requireSignin, fetchUser);

router.post('/admin/delete/:id', requireSignin, deleteUser);

// User

router.get('/user/profile', requireSignin, fetchProfile);

router.post('/user/profile/password', requireSignin, changePassword);

// router.get("//:id", requireSignin, getOrderBySlug);
module.exports = router;
