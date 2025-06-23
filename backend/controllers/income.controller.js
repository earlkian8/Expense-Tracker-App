import Income from "../models/income.model.js";
import mongoose from "mongoose";

export const getAllIncome = async (req, res) => {
    try {
        const incomeData = await Income.find({ account: req.user._id });
        res.status(200).json({
            success: true,
            income: incomeData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const addIncome = async (req, res) => {
    const { amount, category, type, description } = req.body;

    if (!amount || !category || !type || !description) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields!"
        });
    }

    try {
        const newIncome = await Income.create({
            amount,
            category,
            type,
            description,
            account: req.user._id
        });

        res.status(201).json({
            success: true,
            income: newIncome
        });
    } catch (error) {
        console.error("Error in Creating Income", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, category, type, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Income not Found"
        });
    }

    try {
        const income = await Income.findOne({ _id: id, account: req.user._id });
        if (!income) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can't update this income."
            });
        }

        // Update the income
        const updatedIncome = await Income.findByIdAndUpdate(
            id,
            { amount, category, type, description },
            { new: true }
        );

        res.status(200).json({
            success: true,
            income: updatedIncome
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Income not Found"
        });
    }

    try {
        const income = await Income.findOne({ _id: id, account: req.user._id });
        if (!income) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can't delete this income."
            });
        }

        await Income.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Income Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}; 