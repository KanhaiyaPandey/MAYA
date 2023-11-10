import mongoose from 'mongoose';
const url = "https://i.stack.imgur.com/34AD2.jpg";

const UserSchema = new mongoose.Schema({

    name: String,
    email: String,
    username: String,
    password: String,
    following:[
         {
            type: mongoose.Types.ObjectId,
            ref: "User"  
        }
] ,

followers: [
    {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
],
  profilePic: {type: String, default: url},
  isAdmin: {type: Boolean, default: false}
});

UserSchema.methods.toJSON = function(){
  let obj = this.toObject();
  delete obj.password
  return obj;
 }

export default mongoose.model('User', UserSchema);