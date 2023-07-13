const express = require("express");
const { UserModel } = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth } = require("../Middlewares/AuthMiddleware");
require("dotenv").config();

const AuthRouter = express.Router();

AuthRouter.use(Auth);

AuthRouter.post("/signup", async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({ msg: "User Already Exists Login." });
    }

    bcrypt.hash(password, 5, (err, hash) => {
      if (err) {
        return res.json({ msg: "Something went wrong in Bcrypt" });
      }

      const newUser = new UserModel({ email, password: hash });
      newUser.save();
      res.json({ msg: "Success", newUser });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ msg: "Signin first." });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        jwt.sign(
          { empID: user._id, empEmail: user.email },
          process.env.secreteKey,
          (err, token) => {
            if (token) {
              res.json({ msg: "Success", token });
            } else {
              return res.json({
                msg: "Something went wrong in JWT token Generation",
              });
            }
          }
        );
      } else {
        res.json({ msg: "Incorrect Password" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { AuthRouter };
