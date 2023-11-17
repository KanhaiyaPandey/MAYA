import {StatusCodes} from "http-status-codes";
import User from "../models/userModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import Post from "../models/postModel.js";

export const following = async(req, res) =>{

    const userIdToFollow = req.params.id;

  try {

    const followUser = await User.findById(userIdToFollow).select('-password');
    const {username} = followUser;


    if (!followUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    const loggedInUser = await User.findById(req.user.userId);

    await User.updateOne(
        { _id: loggedInUser._id },
        {
          $addToSet: {
            following: followUser._id,
          },
        }
      );

    await User.updateOne(
        { _id: followUser._id },
        {
          $addToSet: {
            followers: loggedInUser._id,
          },
        }
      );

    res.status(StatusCodes.OK).json({ mgs:`following ${username}` });

  } catch (error) {

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
  }
};


 export const currentUser = async(req, res) =>{
    res.status(StatusCodes.OK).json({msg: "get current user"})
 }

//  export const getUserByUsername = async(req, res) => {
//     const {search} = req.query
//     const username = search;
//     const user = await User.findOne({username}).select("-password");
//     res.status(StatusCodes.OK).json({user});
//  }


 export const getUserById = async (req, res) =>{

    const requestedUser = await User.findById(req.params.id).select('-password');
    if(!requestedUser) throw new NotFoundError("user not found");

    const isFollowing = req.user.following.find(id => id === requestedUser._id)!== undefined;
    console.log(requestedUser._id);

    if (isFollowing !== undefined) {
      const userPosts = await Post.find({ postedBy: requestedUser._id });
      res.status(StatusCodes.OK).json({ user: requestedUser, posts: userPosts });
    } else {
      delete requestedUser.following;
      delete requestedUser.followers;
      res.status(StatusCodes.OK).json({user: requestedUser });
    }
 }

 
 export const updatetUser = async(req, res) =>{
   const { username, email, profilePic } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.status(StatusCodes.OK).json({ user });
 }
