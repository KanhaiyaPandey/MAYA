import {body,param ,validationResult} from "express-validator"
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/customErrors.js"
import User from "../models/userModel.js";

const withValidationErrors = (validateValues)=>{
    return [
        validateValues, 
        (req,res,next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              const errorMessage = errors.array().map((error) => error.msg);
              if(errorMessage[0].startsWith("no job")){
                throw new NotFoundError(errorMessage)
              }
              if(errorMessage[0].startsWith("not authorized")){
               if(!isAdmin && !isOwner) throw new UnauthenticatedError("not authorized to access this route")
              }
              throw new BadRequestError(errorMessage);
            }
            next();
     },
  ];
};



export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
     body("email").
     notEmpty()
     .withMessage("email is required")
     .isEmail()
     .withMessage("invalid email please enter valid email")
     .custom(async (email) =>{
            const user = await User.findOne({email});
            if(user) throw new BadRequestError("email already exists")
     }),
     body("username")
     .notEmpty()
     .withMessage("Username is required")
     .isLength({ min: 3, max: 20 })
     .withMessage("Username must be between 3 and 20 characters")
     .custom(async (username) => {
       const existingUser = await User.findOne({ username });
       if (existingUser) throw new BadRequestError("Username already exists");
     }),
     body("password")
     .notEmpty()
     .withMessage("password is reqired")
     .isLength({min:8})
     .withMessage("password must be 8 characters long"),
  ]);

  export const validateLoginInput = withValidationErrors([
    body("email").notEmpty().withMessage("email is required")
   .isEmail().withMessage("invalid email please enter correct email"),
  
    body("password").notEmpty().withMessage("password is reqired"),
 ]);