import Expense from "../models/expense.model.js";
import mongoose from "mongoose";

export const getAllExpense = async (req, res) => {
    try {
        const expensesData = await Expense.find({ account: req.user._id });
        res.status(200).json({
            success: true,
            expenses: expensesData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const addExpense = async (req, res) => {
    const { amount, category, type, description } = req.body;

    if (!amount || !category || !type || !description) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields!"
        });
    }

    try {
        const newExpense = await Expense.create({
            amount,
            category,
            type,
            description,
            account: req.user._id
        });

        res.status(201).json({
            success: true,
            expense: newExpense
        });
    } catch (error) {
        console.error("Error in Creating Expense", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, category, type, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Expense not Found"
        });
    }

    try {
        const expense = await Expense.findOne({ _id: id, account: req.user._id });
        if (!expense) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can't update this expense."
            });
        }

        // Update the expense
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { amount, category, type, description },
            { new: true }
        );

        res.status(200).json({
            success: true,
            expense: updatedExpense
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Expense not Found"
        });
    }

    try {
        const expense = await Expense.findOne({ _id: id, account: req.user._id });
        if (!expense) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can't delete this expense."
            });
        }

        await Expense.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Expense Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};