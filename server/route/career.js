const express = require("express");
const { upload, requireSignin } = require("./../middleware/index");
const { fetchCareer, createCareer, deleteCareer, editCareer } = require("../controller/career");

const router = express.Router();

//Get
router.get("/nganhnghe", requireSignin, upload.none(), fetchCareer);

//Post
router.post("/nganhnghe", requireSignin, upload.none(), createCareer);


//Edit
router.post("/nganhnghe/edit/:id", requireSignin, upload.none(), editCareer);



//Delete
router.post("/nganhnghe/delete/:id", requireSignin, upload.none(), deleteCareer);

module.exports = router;
