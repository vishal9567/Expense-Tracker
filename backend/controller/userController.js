import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  register: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(409)
          .json({ message: "Email already exist", color: "warning" });
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const obj = {
        name: req.body.name,
        email: req.body.email,
        password: password,
      };
      const userData = await User.create(obj);
      const newUser = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      };
      res.status(201).json({
        message: "User Created successfully",
        color: "success",
        newUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error",color:'error' });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).json({ message: "Invalid user name",color:'warning' });
      const isUser = await bcrypt.compare(req.body.password, user.password);
      if (!isUser)
        return res.status(401).json({ message: "Incorrect password",color:'error' });
      const newUser = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      res.status(200).json({ newUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error",error:'error' });
    }
  },
};
