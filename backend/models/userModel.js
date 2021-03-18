import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

//will take in entered password and hash it to hashed pw in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//adding middleware to encrypt the password before it gets saved
//it only runs when the password is sent or modified, and not when the profile is just updated
userSchema.pre("save", async function (next) {
  //this is a function of mongoose to see if the password was updated
  if (!this.isModified("password")) {
    next();
  }
  //if it was modified then this will run and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//create model from the schema, capital and singular
const User = mongoose.model("User", userSchema);

export default User;
