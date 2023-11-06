import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import morgan from "morgan"

// routes
import authRouter from "./Routes/authRoutes.js"

/* config */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
  }
app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")))


app.use("/auth", authRouter )


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