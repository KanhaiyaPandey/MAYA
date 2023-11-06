import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async(req, res) =>{

    try {  
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

 const hashedPassword = await hashPassword(password)

 const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    picturePath,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random()*1000),
    impression   : Math.floor(Math.random()*1000)
 })
 const savedUser = await newUser.save();
 res.status(StatusCodes.CREATED).json({savedUser});
        
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) =>{
   
    const user = await User.findOne({email: req.body.email});  
    const isValidUser = await comparePassword(req.body.password, user.password);
    if(!isValidUser) throw new UnauthenticatedError("invalid credentials");
    const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET);
    delete user.password ;
    res.status(StatusCodes.OK).json({msg: "user logged in"})
}