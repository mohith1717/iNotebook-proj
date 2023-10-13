const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt=require('jsonwebtoken');
const JWT_pass="mohithisagoodb$oy";
const bcrypt=require('bcryptjs');

const fetchuser=require('../middleware/fetchuser');
// Create a user using:POST "/api/auth/createuser".Doesn't require auth

router.post(
  "/createuser",
  body("name", "Enter a valid name with length greater than 3").isLength({
    min: 3,
  }),
  [
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "Enter a password with atleast 5 words character"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);
    // const user=User(req.body);

    // user.save();

    // if there are any errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "this is already taken email",
        });
      }
      const salt=await bcrypt.genSaltSync(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // .then((user) => res.json(user))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({
      //       error: "Please enter the proper original",
      //       message: err.message,
      //     });
      //   });
      //   user.save();
      // res.send(req.body);
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_pass);
      
      res.json({authtoken});
    } catch (error) {
      console.log(error.message);
    }
  }
);


// Authenticate a User using:POST "/api/auth/login".No login required

router.post("/login",body('email','Enter a valid email to proceed').isEmail(),body('password','Password cannot be blank').exists(),async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try{
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }

      const passwordCompare=await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:'please try to login with correct password'});

      }

      const data={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_pass);
      res.json({authtoken});
    }catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
})
module.exports = router;


// Route3=>Get loggedin User Details using:POST "/api/auth/login".No login required

router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    // userId="todo";
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
})
