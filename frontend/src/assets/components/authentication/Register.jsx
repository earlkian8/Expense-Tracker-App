import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await axios.post("/api/accounts/register", {name, username, password});
            if(response.data.success){
                setSuccess("Account created successfully! Redirecting to login...");
                setName("");
                setUsername("");
                setPassword("");
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            setLoading(false);
            if (err.response?.status === 400 && err.response?.data?.message?.includes('Username already exists')) {
                setError("Username already exists. Please choose a different username.");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }  
        }
    }
    
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h2>
                
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
                        <label htmlFor="register-name" className="block text-gray-700 mb-2 font-medium">Name</label>
                        <input 
                            id="register-name" 
                            name="name" 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg" 
                            placeholder="Enter your name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="register-username" className="block text-gray-700 mb-2 font-medium">Username</label>
                        <input 
                            id="register-username" 
                            name="username" 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg" 
                            placeholder="Choose a username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="register-password" className="block text-gray-700 mb-2 font-medium">Password</label>
                        <input 
                            id="register-password" 
                            name="password" 
                            type="password" 
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg" 
                            placeholder="Create a password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
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
                                Creating Account...
                            </div>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign In</Link>
                </div>
            </div>
        </section>
    );
}

export default Register;