const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@routes GET /api/admin/orders

//@desc Get all orders
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});
//@routes PUT /api/admin/orders/:id/
//@desc Update order to delivered

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status= req.body.status || order.status;
      order.isDelivered = req.body.status ==="Delivered" ? true : order.isDelivered;
      order.deliveredAt = req.body.status ==="Delivered" ? Date.now() : order.deliveredAt;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});

//@route DELETE /api/admin/orders/:id
//@desc Delete an order
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order removed." });
    } else {
      res.status(404).json({ message: "Order not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});


module.exports = router;
