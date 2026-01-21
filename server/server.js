const express= require("express");
const ConnectToDb = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const adminRoutes=require("./routes/AdminRoutes");
const MentorsRoutes=require("./routes/MentorsRoutes")
const cors=require("cors");

require("dotenv").config();
const app=express();
app.use(express.json());
ConnectToDb();

const port=process.env.PORT || 5000;
app.use(cors({
    origin:["http://localhost:5174","http://localhost:5173"],
    credentials:true,
}))

app.use("/api/admin",adminRoutes);
app.use("/api/auth",authRoutes);
app.use("/api",MentorsRoutes)
app.listen(port,()=>{
    console.log(`the server is running in http://localhost:${port}`);
})
 