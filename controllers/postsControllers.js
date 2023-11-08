import { NotFoundError } from "../errors/customErrors.js";
import Post from "../models/postModel.js"
import {StatusCodes} from "http-status-codes";

export const createPost = async (req, res) => {
    req.body.postedBy = req.user.userId
    const post = await Post.create(req.body);
    console.log(post);
    res.status(StatusCodes.CREATED).json({ post });
  };

  export const getAllPosts = async (req, res) => {
    const posts = await Post.find({postedBy: req.user.userId});
    res.status(StatusCodes.OK).json({ posts });
  };


//   export const deletePost = async (req, res) => {
//     const { id } = req.params;
//     const removedPost = await Post.findByIdAndDelete(id);
  
//     if (!removedPost) {
//       throw new NotFoundError("no post found");
//     }
//     res.status(StatusCodes.OK).json({ Post: removedJob });
//   };