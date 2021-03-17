import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: {
    //add a relationship between the product that was added and the user that added it
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  nwt: {
    type: Boolean,
    required: true,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  subColor: {
    type: String,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 1,
  },
  images: {
    type: Array,
    required: true,
  },
});

//create the model, first variable 'collection name' is SINGULAR, Mongoose will make plural
//second variable is the schema
const Product = mongoose.model("Product", productSchema);

//export product model
export default Product;
