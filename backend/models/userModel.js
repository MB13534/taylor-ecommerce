import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  //you dont need to add timestamps manually, you can send an optional second argument options object

  {
    timestamps: true,
  }
);

//create model from the schema, capital and singular
const User = mongoose.model("User", userSchema);

export default User;
