import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtil.js";


// register controller

export const register = async (req, res) => {
  const isFirst = await User.countDocuments() === 0;
  req.body.isAdmin = isFirst;

  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword;


  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
  };

  // login controller

  export const login = async (req, res) =>{
    const user = await User.findOne({email: req.body.email});  
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if(!isValidUser) throw new UnauthenticatedError("invalid credentials");

      const token = createJWT({userId: user._id, role: user.isAdmin, username: user.username, following: user.following});
      const oneDay = 60*60*1000*24;

      res.cookie("token", token,{ 
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production"
      })
        res.status(StatusCodes.OK).json({msg: "logged in successfully"})
      
};




