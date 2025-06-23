import Account from "../models/account.model.js";
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Please provide all fields!" 
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const account = await Account.create({
            name,
            username,
            password: hashedPassword
        });

        res.status(201).json({ 
            success: true, 
            account 
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ 
                success: false, 
                message: "Username already exists!" 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: "Server Error" 
            });
        }
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Please provide username and password!" 
        });
    }

    try {
        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ 
                success: false, 
                message: "Account not found!" 
            });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials!" 
            });
        }

        const token = jwt.sign(
            { id: account._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            success: true, 
            token, 
            account 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error" 
        });
    }
};
