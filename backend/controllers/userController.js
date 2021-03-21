import asyncHandler from "express-async-handler";

//models
//mongoose will call to fetch the products
import User from "../models/userModel.js";

//generate token function
import generateToken from "../utils/generateToken.js";

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
      //create token
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc      register a new user
// @route     POST /api/users
// @access    public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //make sure that the email is not already used
  const userExists = await User.findOne({ email: email });

  //if the userexists throw an error
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //if the email is unique, then create the user

  const user = await User.create({
    name,
    email,
    password,
  });

  //if the user was created, resopnd with the credentials so they can be authenticated
  if (user) {
    //201 means something was created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //create token
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc      get user profile
// @route     GET /api/users/profile
// @access    private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc      update user profile
// @route     PUT /api/users/profile
// @access    private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc      get all user profile
// @route     GET /api/users/
// @access    private/admin only
export const getUsers = asyncHandler(async (req, res) => {
  //empty object will respond with everything
  const users = await User.find({});

  res.json(users);
});

// @desc      delete a user profile
// @route     delete /api/users/:id
// @access    private/admin only
export const deleteUser = asyncHandler(async (req, res) => {
  //empty object will respond with everything
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

// @desc      get an individual user profile by id
// @route     GET /api/users/:id
// @access    private/admin only
export const getUserById = asyncHandler(async (req, res) => {
  //empty object will respond with everything
  //send everything back except the password
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// @desc      update user
// @route     PUT /api/users/:id
// @access    private/admin only
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin =
      req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
