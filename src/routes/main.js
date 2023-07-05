const express = require('express')
// const { route } = require('express/lib/application')
const routes = express.Router()

//Fetching data from database
const Program = require("../models/program")
const Department = require("../models/department")
const Course = require("../models/course")
const Chapter = require("../models/chapter")
const Question = require("../models/question")
const Faculty = require("../models/faculty")
const User = require("../models/user")


//Routes 
routes.post("/login", async (req, res) => {
    const {email, password} = (req.body)
    console.log(req.body)
    try{
        const user = await User.findOne({email : email});
        if(user){
            if(password === user.password){
                res.send({message: "Login Successful"})
            }
            else {
                res.send({message : "password didn't match"})
            }
        } else{
            res.send({message: "User not registered"})
        }
    }
    catch(error){
        console.log(error)
    }

}) 

routes.post("/home", (req, res) => {
    // const {email, password} = req.body
    console.log(req.body)
    res.send(req.body)
})

routes.post("/register", async (req, res)=> {
    // console.log(req.body)
    const {name , email, password} = req.body
    try{
        const user = await User.findOne({email : email});
        if(user){
            res.send({message :"User already registered"})
        } else{
            const user = new User({
                name,
                email, 
                password
            })
            const result = await user.save();
            res.send({message: "User successfully registered"})
            // console.log(result) 
        }
    }
    catch(error){
        console.log(error)
    }

}) 


module.exports = routes