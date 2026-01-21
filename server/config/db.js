const mongoose=require("mongoose");
require("dotenv").config();

const ConnectToDb=async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected successfully...");
    }
    catch(error)
    {
        console.log("database connection failed...");
        console.log(error.message);
        process.exit(1);
    }
}
module.exports=ConnectToDb;