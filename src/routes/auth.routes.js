import {Router} from "express";
import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router =Router();

router.post("/register" ,async(req,res)=>{
const{name , email , password} = req.body;


//Validation
if(!name || !email || !password){
    return res.status(400).json({error:"ALL fields required"});
    
}
    //checking if the user already exists

    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({error:"Email already rejstered"});

    //hashing the passcode  so we go above from basic
    const hash = await bycrypt.hash(password,10);


    //create a user
    const user = await User.create({name,email,password:hash});
    res.status(201).json({user:{id: user._id ,email: user.email}});



});

router.post("/login" ,async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({error:"Invalid credentials"});

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);

  // send cookie
  res.cookie("jwt", token, { httpOnly: true, maxAge: 7*24*60*60*1000 });
  res.json({ message: "Login successful", token });
  router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out" });
});

});

export default router;
