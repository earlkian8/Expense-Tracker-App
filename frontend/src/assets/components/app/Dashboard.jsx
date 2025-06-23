import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const Dashboard = () => {
    const { userId } = useParams();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [loading, setLoading] = useState(true);
    
    // Data states
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [stats, setStats] = useState({
        totalExpenses: 0,
        totalIncome: 0,
        netBalance: 0,
        expenseChange: 0,
        incomeChange: 0,
        balanceChange: 0
    });
    const [recentTransactions, setRecentTransactions] = useState([]);

    // Get auth token from localStorage
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    // Fetch all data
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch expenses and income in parallel
            const [expensesResponse, incomeResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/expenses`, { headers: getAuthHeaders() }),
                axios.get(`${API_BASE_URL}/income`, { headers: getAuthHeaders() })
            ]);

            const expensesData = expensesResponse.data.success ? expensesResponse.data.expenses : [];
            const incomeData = incomeResponse.data.success ? incomeResponse.data.income : [];

            setExpenses(expensesData);
            setIncome(incomeData);

            // Calculate statistics
            const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.amount, 0);
            const totalIncome = incomeData.reduce((sum, inc) => sum + inc.amount, 0);
            const netBalance = totalIncome - totalExpenses;

            // Calculate changes (simplified - you can implement more sophisticated logic)
            const expenseChange = expensesData.length > 0 ? -5.2 : 0;
            const incomeChange = incomeData.length > 0 ? 12.3 : 0;
            const balanceChange = netBalance > 0 ? 8.7 : -2.1;

            setStats({
                totalExpenses,
                totalIncome,
                netBalance,
                expenseChange,
                incomeChange,
                balanceChange
            });

            // Combine and sort recent transactions
            const allTransactions = [
                ...expensesData.map(expense => ({
                    ...expense,
                    type: 'expense',
                    displayAmount: -expense.amount,
                    date: new Date(expense.createdAt || Date.now())
                })),
                ...incomeData.map(inc => ({
                    ...inc,
                    type: 'income',
                    displayAmount: inc.amount,
                    date: new Date(inc.createdAt || Date.now())
                }))
            ].sort((a, b) => b.date - a.date).slice(0, 5);

            setRecentTransactions(allTransactions);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            
            // Fallback to mock data
            const mockExpenses = [
                { _id: 1, amount: 850, category: 'food', description: 'Grocery Shopping', createdAt: new Date('2024-06-19') },
                { _id: 2, amount: 180, category: 'transport', description: 'Uber Ride', createdAt: new Date('2024-06-18') },
                { _id: 3, amount: 120, category: 'food', description: 'Coffee', createdAt: new Date('2024-06-17') }
            ];
            
            const mockIncome = [
                { _id: 1, amount: 5500, category: 'freelance', description: 'Freelance Payment', createdAt: new Date('2024-06-18') },
                { _id: 2, amount: 20000, category: 'salary', description: 'Salary', createdAt: new Date('2024-06-15') }
            ];

            setExpenses(mockExpenses);
            setIncome(mockIncome);

            const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
            const totalIncome = mockIncome.reduce((sum, inc) => sum + inc.amount, 0);
            const netBalance = totalIncome - totalExpenses;

            setStats({
                totalExpenses,
                totalIncome,
                netBalance,
                expenseChange: -5.2,
                incomeChange: 12.3,
                balanceChange: 8.7
            });

            const allTransactions = [
                ...mockExpenses.map(expense => ({
                    ...expense,
                    type: 'expense',
                    displayAmount: -expense.amount,
                    date: new Date(expense.createdAt)
                })),
                ...mockIncome.map(inc => ({
                    ...inc,
                    type: 'income',
                    displayAmount: inc.amount,
                    date: new Date(inc.createdAt)
                }))
            ].sort((a, b) => b.date - a.date).slice(0, 5);

            setRecentTransactions(allTransactions);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        fetchDashboardData();
        
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'food':
                return '🍽️';
            case 'transport':
                return '🚗';
            case 'utilities':
                return '⚡';
            case 'salary':
                return '💰';
            case 'freelance':
                return '💼';
            case 'business':
                return '🏢';
            default:
                return '📝';
        }
    };

    if (loading) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">
                                Welcome back! Here's your financial overview.
                            </p>
                            {userId && <p className="text-xs text-blue-600 mt-1">User ID: {userId}</p>}
                            <p className="text-sm text-gray-500 mt-1">
                                {formatDate(currentTime)} • {formatTime(currentTime)}
                            </p>
                        </div>
                    </div>

                    {/* Period Selector */}
                    <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-lg w-fit">
                        {['week', 'month', 'year'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                                    selectedPeriod === period
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                This {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {/* Total Expenses */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${stats.expenseChange < 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {stats.expenseChange > 0 ? '+' : ''}{stats.expenseChange}%
                            </div>
                        </div>
                        <h3 className="text-gray-600 font-medium mb-2">Total Expenses</h3>
                        <div className="text-3xl font-bold text-red-600 mb-1">₱{stats.totalExpenses.toLocaleString()}</div>
                        <p className="text-gray-500 text-sm">This {selectedPeriod}</p>
                    </div>

                    {/* Total Income */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </div>
                            <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                                +{stats.incomeChange}%
                            </div>
                        </div>
                        <h3 className="text-gray-600 font-medium mb-2">Total Income</h3>
                        <div className="text-3xl font-bold text-green-600 mb-1">₱{stats.totalIncome.toLocaleString()}</div>
                        <p className="text-gray-500 text-sm">This {selectedPeriod}</p>
                    </div>

                    {/* Net Balance */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group md:col-span-2 xl:col-span-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${stats.balanceChange >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                                {stats.balanceChange >= 0 ? '+' : ''}{stats.balanceChange}%
                            </div>
                        </div>
                        <h3 className="text-gray-600 font-medium mb-2">Net Balance</h3>
                        <div className={`text-3xl font-bold mb-1 ${stats.netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            ₱{stats.netBalance.toLocaleString()}
                        </div>
                        <p className="text-gray-500 text-sm">This {selectedPeriod}</p>
                    </div>
                </div>

                {/* Recent Transactions and Overview */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Recent Transactions */}
                    <div className="xl:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
                        </div>
                        <div className="space-y-4">
                            {recentTransactions.length > 0 ? (
                                recentTransactions.map((transaction) => (
                                    <div key={transaction._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{transaction.category}</p>
                                                <p className="text-sm text-gray-500">{transaction.description}</p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(transaction.createdAt || transaction.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'income' ? '+' : ''}₱{Math.abs(transaction.displayAmount || transaction.amount).toLocaleString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No transactions yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Financial Summary</h3>
                        <div className="space-y-6">
                            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0}%
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Income</span>
                                    <span className="font-semibold text-green-600">₱{stats.totalIncome.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Expenses</span>
                                    <span className="font-semibold text-red-600">₱{stats.totalExpenses.toLocaleString()}</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between">
                                    <span className="text-gray-600 font-medium">Net Balance</span>
                                    <span className={`font-bold ${stats.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ₱{stats.netBalance.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={fetchDashboardData}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                            >
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;