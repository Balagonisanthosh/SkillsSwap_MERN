const MentorRequest = require("../models/MentorRequest");
const User = require("../models/User");

const FetchMentors = async (req, res) => {
  try {
    const mentorsList = await MentorRequest.find().populate("userId", "username email")
      .sort({ createdAt: -1 })

    if (mentorsList.length === 0) {
      return res.status(200).json({
        message: "No mentor requests found",
        mentorsList: [],
      });
    }

    return res.status(200).json({
      message: "Available mentor requests",
      mentorsList,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const approveMentorRequest = async (req, res) => {

  try {
    const { id } = req.params;

    const mentorRequest = await MentorRequest.findById(id);
    if (!mentorRequest) {
      return res.status(404).json({
        message: "mentor request not found....!"
      })
    }
    if (mentorRequest.status === "approved") {
      return res.status(400).json({
        message: "mentor request already approved..."
      })
    }
    mentorRequest.status = "approved";
    await mentorRequest.save();

    const user = await User.findById(mentorRequest.userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found!"
      })
    }
    user.role = "mentor";
    user.mentorStatus = "approved";
    await user.save();
    return res.status(200).json({
      status: true,
      message: "user updated successfully..."
    })



  } catch (error) {
    return res.status(500).json({
      message: "internal server errro"
    })

  }
}
const rejectMentorRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const mentorRequest = await MentorRequest.findById(id);
    if (!mentorRequest) {
      return res.status(404).json({
        message: "mentor request not found...!"
      })
    }
    if (mentorRequest.status === "rejected") {
      return res.status(401).json({
        message: "user already rejected ! please select another user"
      })
    }
    mentorRequest.status = "rejected";
    await mentorRequest.save();

    const user = await User.findById(mentorRequest.userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found"
      })
    }

    user.mentorStatus = "rejected";
    await user.save();
    return res.status(200).json({
      message: "user updated ...."
    });

  } catch (error) {
    return res.status(500).json({
      message:"internal server error"
    })

  }

}
module.exports = { FetchMentors, approveMentorRequest, rejectMentorRequest };
