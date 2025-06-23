import express from 'express';
import { auth } from '../middleware/auth.js';

import { getAllExpense } from '../controllers/expense.controller.js';
import { addExpense } from '../controllers/expense.controller.js';
import { updateExpense } from '../controllers/expense.controller.js';
import { deleteExpense } from '../controllers/expense.controller.js';

const router = express.Router();

// Apply auth middleware to all expense routes
router.use(auth);

router.get("/", getAllExpense);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;