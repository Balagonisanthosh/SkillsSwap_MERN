const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const MentorRequest = require("../models/MentorRequest");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      skillsYouKnown = [],
      skillsYouWantToLearn = [],
    } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      skillsYouKnown,
      skillsYouWantToLearn,
      role: "user",
      mentorStatus: "none",
    });

    await newUser.save();

    return res.status(201).json({
      message: "user registered successfully",
      userId: newUser._id,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const login= async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(404).json({
            message:"please fill all the details"
        })
    }
    const user=await User.findOne({email});
    if(!user)
    {
        return res.status(401).json({
            message:"user not found please register",

        })
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch)
    {
        return res.status(404).json({
            message:"password is incorrect"
        })
    }
    const token =jwt.sign({id:user._id,role: user.role,
        mentorStatus: user.mentorStatus,},process.env.MYSECRECT_KEY,{expiresIn:"1d"});

    return res.status(201).json({
        message:"login successfull",
        token:token,
    })

}

const applyMentorRequest=async (req,res)=>{
  try {
    const userId=req.user.id;
    const {linkedInURL}=req.body;

    if(!linkedInURL)
    {
      return res.status(400).json({
        message:"LinkedIn URl is required"
      })
    }
    if(!req.file)
    {
      return res.status(400).json({
        message:"intro video is required!"
      });
    }
    const user=await User.findById(userId);
    if(!user)
    {
      res.status(404).json({
        message:"user not found",
      })
    }
    if(user.role === "mentor")
    {
      return res.status(400).json({
        message:"you are already a mentor",
      });
    }
    if(user.mentorStatus ==="pending")
    {
      return res.json({
        message:"mentor request already submitted"
      })
    }
    await MentorRequest.create({
      userId,
      linkedInURL,
      uploadVideo:req.file.path
    });

    user.mentorStatus="pending";
    await user.save();
    return res.status(201).json({
      success:true,
      message:"Mentor request submitted successsfully"
    })

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    
  })
}
}



module.exports = {register, login, applyMentorRequest}
