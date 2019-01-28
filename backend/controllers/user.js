const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then(hash => {
      user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "user save successfuly!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
  }

  exports.userLogin =  (req, res, next) => {
    let fetchedUser;
    console.log("1- step");
    User.findOne({ email: req.body.email })
      .then(user => {
        if(!user){
          return res.status(404).json({
            message:"This user not found!"
          });
        }
        console.log("2- step");
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
  
      }).then(result =>{
        if(!result){ 
          return res.status(401).json({
            message:"Invalid Credentials"
          });
        }
        console.log("3- step");
  
        const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
  
        return res.status(200).json({
          message:"Login successfuly",
          token:token,
          userId:fetchedUser._id, 
          expiresIn:3600
        });
      })
      .catch(err => {
        return res.status(401).json({
          message:"Some error happended"
        });
        console.log("An error happend " + err);
      });
  }