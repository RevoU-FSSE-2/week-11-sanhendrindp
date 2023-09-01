const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          Message: "Email already exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              Error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  Message: "User created successfully",
                  // Result: result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  Error: err,
                });
              });
          }
        });
      }
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        // No user with the provided email found
        return res.status(401).json({
          Message: "Email is incorrect",
        });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // Error when password is compare
          return res.status(401).json({
            Message: "Login failed",
          });
        }

        if (result) {
          // If password correct
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            process.env.JWT_KEY,
            {
              // Tell how long token is valid
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            Message: "Login successful",
            Token: token,
          });
        }

        // Passwords incorrect
        res.status(401).json({
          Message: "Password is incorrect",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
};

const deleteUser = (req, res, next) => {
  const id = req.params.id;

  User.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        Message: "User deleted successfully",
        Result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        Error: err,
      });
    });
};

module.exports = { createUser, loginUser, deleteUser };
