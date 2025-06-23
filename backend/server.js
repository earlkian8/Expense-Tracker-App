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
    origin: '*',
    credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/accounts", accountRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server starts at localhost:5000");
});

export default app; 