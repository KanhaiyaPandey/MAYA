import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    photo: String,
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
{timestamps: true}
)

export default mongoose.model("Post", postSchema);