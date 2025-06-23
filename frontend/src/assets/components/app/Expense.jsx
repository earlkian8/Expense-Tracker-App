import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Move Modal component outside to prevent re-rendering issues
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

const Expense = () => {
    const { userId } = useParams();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredItem, setHoveredItem] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        type: 'expense',
        description: ''
    });

    const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api') + '/expenses';

    // Get auth token from localStorage
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_BASE_URL, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setExpenses(response.data.expenses);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
            // For demo purposes, fallback to mock data
            setExpenses([
                {
                    _id: 1,
                    date: "12 Apr 2024",
                    title: "Food & Dining",
                    description: "Lunch at Cafe",
                    amount: 250,
                    category: "food",
                    type: "expense"
                },
                {
                    _id: 2,
                    date: "11 Apr 2024",
                    title: "Transportation",
                    description: "Uber ride to office",
                    amount: 180,
                    category: "transport",
                    type: "expense"
                },
                {
                    _id: 3,
                    date: "10 Apr 2024",
                    title: "Utilities",
                    description: "Electricity bill",
                    amount: 1200,
                    category: "utilities",
                    type: "expense"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_BASE_URL, formData, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setExpenses([...expenses, response.data.expense]);
                setShowAddModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense. Please try again.');
        }
    };

    const handleUpdateExpense = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_BASE_URL}/${selectedExpense._id}`, formData, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setExpenses(expenses.map(expense => 
                    expense._id === selectedExpense._id ? response.data.expense : expense
                ));
                setShowEditModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error updating expense:', error);
            alert('Failed to update expense. Please try again.');
        }
    };

    const handleDeleteExpense = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${selectedExpense._id}`, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setExpenses(expenses.filter(expense => expense._id !== selectedExpense._id));
                setShowDeleteModal(false);
                setSelectedExpense(null);
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('Failed to delete expense. Please try again.');
        }
    };

    const openEditModal = (expense) => {
        setSelectedExpense(expense);
        setFormData({
            amount: expense.amount.toString(),
            category: expense.category,
            type: expense.type || 'expense',
            description: expense.description
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (expense) => {
        setSelectedExpense(expense);
        setShowDeleteModal(true);
    };

    const resetForm = () => {
        setFormData({
            amount: '',
            category: '',
            type: 'expense',
            description: ''
        });
        setSelectedExpense(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'food':
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                );
            case 'transport':
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                );
            case 'utilities':
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                );
        }
    };

    return (
        <section className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Expenses</h3>
                    <p className="text-gray-500 text-sm mt-1">Monitor your spending and outgoing payments</p>
                    {userId && <p className="text-xs text-blue-600 mt-1">User ID: {userId}</p>}
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Expense</span>
                </button>
            </div>
            
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {expenses.map((expense) => (
                        <div 
                            key={expense._id}
                            className="group bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:border-red-200 relative"
                            onMouseEnter={() => setHoveredItem(expense._id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                                            {getCategoryIcon(expense.category)}
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(expense.createdAt || Date.now()).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            <div className="font-semibold text-gray-800 text-lg">{expense.category}</div>
                                            <div className="text-gray-600 text-sm">{expense.description}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-red-600">-₱{expense.amount?.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wide">{expense.category}</div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className={`flex items-center space-x-2 transition-all duration-200 ${hoveredItem === expense._id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                                        <button 
                                            onClick={() => openEditModal(expense)}
                                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                                            title="Edit Expense"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => openDeleteModal(expense)}
                                            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                                            title="Delete Expense"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {expenses.length === 0 && (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-medium text-gray-500 mb-2">No expenses recorded yet</h4>
                            <p className="text-gray-400 text-sm">Start tracking your spending by adding your first expense entry</p>
                        </div>
                    )}
                </div>
            )}

            {/* Add Expense Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    resetForm();
                }}
                title="Add New Expense"
            >
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter amount"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="food">Food & Dining</option>
                            <option value="transport">Transportation</option>
                            <option value="utilities">Utilities</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="shopping">Shopping</option>
                            <option value="health">Healthcare</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter description"
                            rows="3"
                            required
                        />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowAddModal(false);
                                resetForm();
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200"
                        >
                            Add Expense
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Expense Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    resetForm();
                }}
                title="Edit Expense"
            >
                <form onSubmit={handleUpdateExpense} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter amount"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="food">Food & Dining</option>
                            <option value="transport">Transportation</option>
                            <option value="utilities">Utilities</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="shopping">Shopping</option>
                            <option value="health">Healthcare</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Enter description"
                            rows="3"
                            required
                        />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                resetForm();
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                        >
                            Update Expense
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedExpense(null);
                }}
                title="Delete Expense"
            >
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">Are you sure?</h4>
                        <p className="text-gray-600">
                            This action cannot be undone. This will permanently delete the expense record.
                        </p>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedExpense(null);
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteExpense}
                            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}

export default Expense;