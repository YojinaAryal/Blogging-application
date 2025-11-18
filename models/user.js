const { createHmac,randomBytes} = require('node:crypto');
const {Schema,model}=require("mongoose");

const userSchema= new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    salt: {
        type: String,
        
    },
    password: {
    type: String,
    required: true,
  
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png",
    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER",

    }
},
{timestamps: true}
);

userSchema.pre("save",function(next){
    const user = this;

    if(!user.isModified("password")) return  next();;

    const salt= randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");

    user.salt=salt;
    user.password= hashedPassword;
    next();
});
userSchema.static("matchPassword",function(email,password){
const user= this.findOne({email});
if(!user) return false;
})


const User=model("user",userSchema);
module.exports=User;