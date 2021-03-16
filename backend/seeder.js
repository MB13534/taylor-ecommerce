import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

//data
import users from "./data/users.js";
import products from "./data/products.js";

//models - need to remove data from DB
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

//anything with a DB returns a promise
//first it deletes everything in DB, then it adds users, then products with admin user associated(first user on list)
const importData = async () => {
  try {
    //delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //created Users will be an array of the created users that also has the id that MongoDB created
    //add users to DB
    const createdUsers = await User.insertMany(users);
    //make sure the 0 index of users data is the admin you want marked as creating these listings
    //we need to insert it first so MongoDB will have created the _id
    const adminUser = createdUsers[0]._id;
    //add the _id for the user that ran the seeder and therefore created the item
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //add the products with the added user id to the DB
    await Product.insertMany(sampleProducts);

    console.log("Data has been imported!".green.inverse);
    //exit DB
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    proces.exit(1);
  }
};

const destroyData = async () => {
  try {
    //delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data has been destroyed!".red.inverse);
    //exit DB
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    proces.exit(1);
  }
};

//this checks to see which function should run.
//if the -d is passed through as a second argument, it will run destroy
//otherwise it will run import
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

//can be called with 'node backend/seeder'
//if you want to just destroy the data then 'node backend/seeder -d'
//I added scripts to simplify the process
// "data:import": "node backend/seeder",
// "data:destroy": "node backend/seeder -d"
