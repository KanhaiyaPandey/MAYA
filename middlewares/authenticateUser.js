import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtil.js";

const authenticateUser = async (req, res, next) =>{
  const {token} = req.cookies;
  if(!token) throw new UnauthenticatedError("you are not authorized for this route");
  try {
     const {userId, role, username} = verifyJWT(token);
     req.user = {userId, role, username}
     next();
  } catch (error) {
    throw new UnauthenticatedError("you are not authorized for this route");
  }
}

export default authenticateUser;