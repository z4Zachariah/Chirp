import mongoose from "mongoose";

//This is the User model/Schema for storage in the mongo database
//it sets a structure to the object of a User for storage

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", userSchema);