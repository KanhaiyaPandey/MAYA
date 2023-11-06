import jwt from "jsonwebtoken"
import { UnauthenticatedError } from "../errors/customErrors";

export const authenticateUser = (req, res , next) => {
    try {
        
    let token = req.header("Authorization");

    if(!token) throw new UnauthenticatedError("authentication invalid");

    if(token.startsWith === "Bearer "){
        token = token.slice(7, token.length).trimLeft();
    }
 
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
     next();
   
   } catch (error) {
     throw new UnauthenticatedError("authentication invalid");
   }
   
 };