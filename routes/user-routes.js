const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// Route for create user
router.post("/signup", (req, res, next) => {
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
});

// Route for delete user
router.delete("/:id", (req, res, next) => {
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
});

// Export
module.exports = router;
