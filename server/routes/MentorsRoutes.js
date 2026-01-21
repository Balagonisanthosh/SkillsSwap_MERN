const express=require("express");
const getApprovedMentors = require("../controllers/Mentor-Controller");
const router = express.Router();

router.get("/mentors",getApprovedMentors);

module.exports=router;