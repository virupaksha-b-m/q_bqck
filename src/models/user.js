const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password : String,
    courses: [{ type: String, required: true }],
    isAdmin : {type: Boolean, default: false}
})  

userSchema.pre("save", async function(next) {

    if(this.isModified("password")){
        console.log(`the current password is ${this.password} `);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password} `);        
    }
    next();
})


module.exports = mongoose.model("User", userSchema)
