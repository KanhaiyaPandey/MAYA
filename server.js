import "express-async-errors";

import express from "express"
const app = express();
import morgan from "morgan";
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import {StatusCodes} from "http-status-codes";

// cookie parser
import cookieParser from "cookie-parser";

// routes
import authRouter from './routes/authRoutes.js';
import postRoutes from "./routes/postsRoutes.js"

// middlewares
import errorHandler from "./middlewares/errorHandler.js";
import authenticateUser from "./middlewares/authenticateUser.js";

// consfigs
dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(errorHandler);
app.use(express.json());

app.use("/api/v1/posts", authenticateUser, postRoutes)
app.use('/api/v1/auth', authRouter);




// not found error
app.use('*', (req, res) => {
  res.status(404).json({msg: "not found"});
});

// unexpected err
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong"
  res.status(statusCode).json({msg});
})


const port = process.env.PORT || 3000;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  };