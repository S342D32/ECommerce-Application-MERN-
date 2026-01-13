const express = require("express");
const app = express();
const Product = require("../models/products");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@routes GET /api/admin/products
//@desc Get all products
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});


module.exports = router;