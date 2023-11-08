import mongoose from 'mongoose';
const url = "https://i.stack.imgur.com/34AD2.jpg";

const UserSchema = new mongoose.Schema({

    name: String,
    email: String,
    username: String,
    password: String,
    following:[
         {
        type: Array  
    }
] ,
  profilePic: {type: String, default: url},
  isAdmin: {type: Boolean, default: false}
});

export default mongoose.model('User', UserSchema);