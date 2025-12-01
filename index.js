const path= require("path");
const express = require("express");
const mongoose=require("mongoose");
const cookieParser= require("cookie-parser");
const userRoute= require("./routes/user");
const blogRoute= require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app=express();

const Blog= require("./models/blog");



const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/blogify")
.then((e)=>console.log("MongoDb Connected"));


app.set("view engine","ejs")
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))

app.get("/",async(req,res)=>{    
    const allBlogs=await Blog.find({});
    console.log(allBlogs);
    res.render("home",{
    user: req.user,
    blogs: allBlogs,
    });

});

app.use("/user",userRoute)
app.use("/blog",blogRoute)


app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT: ${PORT}`));
