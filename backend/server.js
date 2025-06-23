import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import expenseRoutes from './routes/expense.routes.js'
import incomeRoutes from './routes/income.routes.js'
import accountRoutes from './routes/account.routes.js'
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/accounts", accountRoutes);
app.listen(5000, () => {
    connectDB();
    console.log("Server starts at localhost:5000");
}); 