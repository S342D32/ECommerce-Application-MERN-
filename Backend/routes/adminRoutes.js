const express = require("express");
const User = require("../models/user");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/users
//@desc Get all user(admin)
//@ access private
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});

//@route POST /api/admin/users
//@desc ADD new user
//@ access private

router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(201).json({ message: "User already exists." });
    }

    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});

//@route PUT /api/admin/users/:id
//@desc Update user
//@ access private

router.put("/:id", protect, admin, async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});

//@route DELETE /api/admin/users/:id
//@desc Delete user
//@ access private

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error." });
  }
});

module.exports = router;
