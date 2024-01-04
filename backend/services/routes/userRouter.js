import express from "express";
const router = express.Router();
import userController from "../../controller/userController.js";

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/addExpense", userController.addExpenses)
router.post("/addBudget", userController.addBudget)
router.delete("/deleteExpense", userController.deleteExpense)

router.get('/dashboardData',userController.getDashboardData)
router.get('/expeseList',userController.getExpenseList)

export default router;