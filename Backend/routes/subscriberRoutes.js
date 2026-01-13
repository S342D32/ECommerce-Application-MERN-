const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@routes POST /api/subscribe
//@desc Handle newsletter subscription
//@access public
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Email is required." });
  }
  try {
    // checl the email iis subscribed
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "email is already subscribed." });
    }
    // Create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res
      .status(201)
      .json({ message: "Successfully subscribed to the  newsletter. " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});


module.exports = router;