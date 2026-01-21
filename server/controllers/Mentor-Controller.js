const User = require("../models/User")

const getApprovedMentors = async (req,res)=>{
    try {

        const mentors =await User.find({role:"mentor",mentorStatus:"approved"}).select("username email skillsYouKnown role");
        return res.status(200).json({
            message:"mentors fetched successfully...",
            mentors,


        })
        
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
        
    }
}

module.exports=getApprovedMentors;