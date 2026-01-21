const mongoose=require("mongoose");
const { applyTimestamps } = require("./User");

const mentorRequestSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,

    },
   
    linkedInURL:{
        type:String,
        trim:true,
    },
    uploadVideo:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"

    }
},{
    timestamps:true
});

module.exports=mongoose.model("MentorRequest",mentorRequestSchema);
