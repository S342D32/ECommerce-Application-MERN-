const mongoose = require("mongoose");

const dotenv = require("dotenv");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    const createUser = await User.create({
      name: "Admin User",
      email: "admin@example@gmail.com",
      password: "1234567",
      role: "admin",
    });
    // assign default user id to each product
    const userId = createUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user:userId };
    });
    // Insert products into database
    await Product.insertMany(sampleProducts);
    console.log("Product data inserted successfully");
    process.exit();
  } catch (error) {
    console.log("Error inserting product data.",error);
     process.exit(1);
  }
};

seedData()