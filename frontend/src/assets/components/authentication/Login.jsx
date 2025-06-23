import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/accounts/login`, { username, password });
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.account));
                
                setSuccess("Login successful! Redirecting to dashboard...");
                const userId = response.data.account._id;
                setTimeout(() => navigate(`/dashboard/${userId}`), 1500);
            }
        } catch (err) {
            setLoading(false);
            if (err.response?.status === 404) {
                setError("Account not found. Please check your username.");
            } else if (err.response?.status === 401) {
                setError("Incorrect password. Please try again.");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Sign In to Your Account</h2>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}
                
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {success}
                        </div>
                    </div>
                )}
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login-username" className="block text-gray-700 mb-2 font-medium">Username</label>
                        <input
                            id="login-username"
                            name="username"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-gray-700 mb-2 font-medium">Password</label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 hover:scale-105 hover:shadow-xl'
                        } text-white`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing In...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">Register</Link>
                </div>
            </div>
        </section>
    );
};

export default Login;