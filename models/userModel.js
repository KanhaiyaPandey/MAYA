import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },

       lastName: {
        type: String,
            required: true,
            min: 3,
            max: 20,
       },
     
       email: {
        type: String,
            required: true,
            max: 20,
            unique: true
       },

       password: {
        type: String,
            required: true,
            min: 8,
       },

       
       picturePath: {
        type: String,
        default: "",
            
       },

      friends : {
         type: Array,
         default: [],
      },

      location: String,
      occupation: String,
      viewedProfile: Number,
      impression: Number,

    },

    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;