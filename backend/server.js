import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import expenseRoutes from './routes/expense.routes.js'
import incomeRoutes from './routes/income.routes.js'
import accountRoutes from './routes/account.routes.js'
import cors from 'cors'

dotenv.config();

const app = express();

// CORS configuration for production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app', // Replace with your actual frontend URL
    'https://expense-tracker-app-frontend.vercel.app' // Example frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/accounts", accountRoutes);

// Connect to database
connectDB();

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => {
        console.log("Server starts at localhost:5000");
    });
}

// Export for Vercel
export default app; 