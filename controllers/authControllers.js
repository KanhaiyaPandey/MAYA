import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js";
import { hashPassword } from "../utils/password.js";
import { StatusCodes } from "http-status-codes";

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
      res.status(500).json({msg: error})
    }
};