import express from 'express';
import { auth } from '../middleware/auth.js';
import { getAllIncome } from '../controllers/income.controller.js';
import { addIncome } from '../controllers/income.controller.js';
import { updateIncome } from '../controllers/income.controller.js';
import { deleteIncome } from '../controllers/income.controller.js';

const router = express.Router();

// Apply auth middleware to all income routes
router.use(auth);

router.get("/", getAllIncome);
router.post("/", addIncome);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

export default router; 