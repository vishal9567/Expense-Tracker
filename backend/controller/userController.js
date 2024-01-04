import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
      res
        .status(500)
        .json({ message: "Internal server error", color: "error" });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(404)
          .json({ message: "Invalid user name", color: "warning" });
      const isUser = await bcrypt.compare(req.body.password, user.password);
      if (!isUser)
        return res
          .status(401)
          .json({ message: "Incorrect password", color: "error" });
      const newUser = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      res.status(200).json({ newUser });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: "error" });
    }
  },
  addExpenses: async (req, res) => {
    const { amount, date, expense, id } = req.body;
    const data = {
      amount,
      date,
      category: expense,
    };
    try {
      await User.updateOne({ _id: id }, { $push: { expense: data } });
      res.status(201).json({ message: "Expese addedd", color: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal sever error" });
    }
  },
  addBudget: async (req, res) => {
    try {
      const { amount, id } = req.body;
      await User.updateOne({ _id: id }, { $set: { budget: amount } });
      res.status(201).json({ message: "Budget addedd", color: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal sever error" });
    }
  },
  getDashboardData: async (req, res) => {
    const currentMonth = new Date().getUTCMonth();
    const currentYear = new Date().getUTCFullYear();
    try {
      const { id } = req.query;
      const budget = await User.findOne({ _id: id }, { _id: 0, budget: 1 });
      const TotalExpense = await User.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(id),
          },
        },
        {
          $unwind: "$expense",
        },
        {
          $match: {
            "expense.date": {
              $gte: new Date(currentYear, currentMonth, 1),
              $lt: new Date(currentYear, currentMonth + 1, 1),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalExpense: { $sum: "$expense.amount" },
          },
        },
      ]);
      const Budget = budget.budget;
      const totalExpense =
        TotalExpense.length > 0 ? TotalExpense[0].totalExpense : 0;
      const balance = Budget - totalExpense;

      const expenseData = {
        budget: Budget,
        expense: totalExpense,
        balance: balance >= 0 ? balance : 0,
      };

      if (TotalExpense.length === 0) return res.status(200).json(expenseData);

      res.status(200).json(expenseData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal sever error" });
    }
  },
  getExpenseList: async (req, res) => {
    const currentMonth = new Date().getUTCMonth();
    const currentYear = new Date().getUTCFullYear();
    const { id } = req.query;
    try {
      const expenseData = await User.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(id),
          },
        },
        {
          $project: {
            _id: 0,
            expense: {
              $filter: {
                input: "$expense",
                as: "exp",
                cond: {
                  $and: [
                    {
                      $gte: [
                        "$$exp.date",
                        new Date(currentYear, currentMonth, 1),
                      ],
                    },
                    {
                      $lt: [
                        "$$exp.date",
                        new Date(currentYear, currentMonth + 1, 1),
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      ]);
      const expenses = expenseData[0].expense;
      if (expenses.length === 0) return res.status(200).json(expenses);
      res.status(200).json(expenses);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal sever error" });
    }
  },
  deleteExpense: async (req, res) => {
    try {
        const {id,userId}=req.query
        await User.updateOne({_id:userId},{$pull:{expense:{_id:id}}});
        console.log(id," ",userId);
        res.status(200).json()
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal sever error" });
    }
  },
};
