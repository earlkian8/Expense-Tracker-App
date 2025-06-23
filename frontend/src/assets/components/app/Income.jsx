import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const Income = () => {
    const { userId } = useParams();
    const [income, setIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
    
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        type: 'income',
        description: ''
    });

    const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api') + '/income';

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    const fetchIncome = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_BASE_URL, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setIncome(response.data.income);
            }
        } catch (error) {
            console.error('Error fetching income:', error);

            setIncome([
                {
                    _id: 1,
                    date: "10 Apr 2024",
                    title: "Salary",
                    description: "Monthly Pay",
                    amount: 20000,
                    category: "salary",
                    type: "income"
                },
                {
                    _id: 2,
                    date: "05 Apr 2024",
                    title: "Freelance Project",
                    description: "Website Development",
                    amount: 5500,
                    category: "freelance",
                    type: "income"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncome();
    }, []);

    const handleAddIncome = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_BASE_URL, formData, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setIncome([...income, response.data.income]);
                setShowAddModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error adding income:', error);
            alert('Failed to add income. Please try again.');
        }
    };

    const handleUpdateIncome = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_BASE_URL}/${selectedIncome._id}`, formData, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setIncome(income.map(item => 
                    item._id === selectedIncome._id ? response.data.income : item
                ));
                setShowEditModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error updating income:', error);
            alert('Failed to update income. Please try again.');
        }
    };

    const handleDeleteIncome = async () => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${selectedIncome._id}`, {
                headers: getAuthHeaders()
            });
            if (response.data.success) {
                setIncome(income.filter(item => item._id !== selectedIncome._id));
                setShowDeleteModal(false);
                setSelectedIncome(null);
            }
        } catch (error) {
            console.error('Error deleting income:', error);
            alert('Failed to delete income. Please try again.');
        }
    };

    const openEditModal = (incomeItem) => {
        setSelectedIncome(incomeItem);
        setFormData({
            amount: incomeItem.amount.toString(),
            category: incomeItem.category,
            type: incomeItem.type || 'income',
            description: incomeItem.description
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (incomeItem) => {
        setSelectedIncome(incomeItem);
        setShowDeleteModal(true);
    };

    const resetForm = () => {
        setFormData({
            amount: '',
            category: '',
            type: 'income',
            description: ''
        });
        setSelectedIncome(null);
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
            case 'salary':
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                );
            case 'freelance':
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                );
            case 'business':
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                );
        }
    };

    return (
        <section className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Income</h3>
                    <p className="text-gray-500 text-sm mt-1">Track your earnings and revenue</p>
                    {userId && <p className="text-xs text-blue-600 mt-1">User ID: {userId}</p>}
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Income</span>
                </button>
            </div>
            
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {income.map((incomeItem) => (
                        <div 
                            key={incomeItem._id}
                            className="group bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:border-green-200 relative"
                            onMouseEnter={() => setHoveredItem(incomeItem._id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                            {getCategoryIcon(incomeItem.category)}
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(incomeItem.createdAt || Date.now()).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            <div className="font-semibold text-gray-800 text-lg">{incomeItem.category}</div>
                                            <div className="text-gray-600 text-sm">{incomeItem.description}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-600">+₱{incomeItem.amount?.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wide">{incomeItem.category}</div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className={`flex items-center space-x-2 transition-all duration-200 ${hoveredItem === incomeItem._id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                                        <button 
                                            onClick={() => openEditModal(incomeItem)}
                                            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                                            title="Edit Income"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => openDeleteModal(incomeItem)}
                                            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                                            title="Delete Income"
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
                    
                    {income.length === 0 && (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-medium text-gray-500 mb-2">No income recorded yet</h4>
                            <p className="text-gray-400 text-sm">Start tracking your earnings by adding your first income entry</p>
                        </div>
                    )}
                </div>
            )}

            {/* Add Income Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    resetForm();
                }}
                title="Add New Income"
            >
                <form onSubmit={handleAddIncome} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="salary">Salary</option>
                            <option value="freelance">Freelance</option>
                            <option value="business">Business</option>
                            <option value="investment">Investment</option>
                            <option value="bonus">Bonus</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                        >
                            Add Income
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Income Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    resetForm();
                }}
                title="Edit Income"
            >
                <form onSubmit={handleUpdateIncome} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="salary">Salary</option>
                            <option value="freelance">Freelance</option>
                            <option value="business">Business</option>
                            <option value="investment">Investment</option>
                            <option value="bonus">Bonus</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                            Update Income
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedIncome(null);
                }}
                title="Delete Income"
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
                            This action cannot be undone. This will permanently delete the income record.
                        </p>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedIncome(null);
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteIncome}
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

export default Income;