const express=require("express");
const {register, login, applyMentorRequest, getMyProfile} = require("../controllers/Auth-Controller");
const upload = require("../middleware/upload");
const authMiddleWare = require("../middleware/Auth-Middelware");
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",authMiddleWare,getMyProfile);

router.post("/mentor/apply",authMiddleWare, upload.single("video"),applyMentorRequest)

module.exports=router;