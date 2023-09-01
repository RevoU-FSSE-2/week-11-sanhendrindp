const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({
        Message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    console.log(result);
    res.status(201).json({
      Message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err.message || "An error occurred while creating the user",
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({
        Message: "Email is incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        Message: "Login successful",
        Token: token,
      });
    }

    res.status(401).json({
      Message: "Password is incorrect",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err.message || "An error occurred while processing the login",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await User.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      return res.status(404).json({
        Message: "User not found",
      });
    }

    res.status(200).json({
      Message: "User deleted successfully",
      Result: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      Error: err.message || "An error occurred while deleting the user",
    });
  }
};

module.exports = { createUser, loginUser, deleteUser };
