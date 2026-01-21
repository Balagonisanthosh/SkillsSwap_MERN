const express=require("express");
const {FetchMentors, approveMentorRequest, rejectMentorRequest} = require("../controllers/Admin-Controller");
const router=express.Router();

router.get("/mentorsRequest",FetchMentors);
router.patch("/mentor/:id/approve",approveMentorRequest)
router.patch("/mentor/:id/reject",rejectMentorRequest)


module.exports=router;