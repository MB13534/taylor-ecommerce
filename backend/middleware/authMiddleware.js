import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//models
import User from "../models/userModel.js";

//next will call the next middleware
export const protect = asyncHandler(async (req, res, next) => {
  //declare token, if there is Bearer followed by a value, it will become assigned, if not, it will be undefined and trigger the error
  let token;

  //check to see if there is a token and that it starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //the token will come in as "Bearer 123ect", we split off Bearer by the space and grab the second index which is the token
      token = req.headers.authorization.split(" ")[1];
      //verify takes in the token and the secret
      //the users ._id is decoded.id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //search for the user in the database and return everything except the password
      //now we have access to this user in all of our protected routes
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    //not authorizxed
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
