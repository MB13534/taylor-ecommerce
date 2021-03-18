import asyncHandler from "express-async-handler";

//models
//mongoose will call to fetch the products
import User from "../models/userModel.js";

// @desc      Auth user & get token
// @route     POST /api/users/login
// @access    public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //take the user that came in via the body and see if it is in the DB
  const user = await User.findOne({ email: email });

  //the method matchPassword was declared in the userModel, it is called to compare the body password with the hashed DB user pw
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
