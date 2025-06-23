import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setUserId(parsedUser._id);
        }

        const pathParts = location.pathname.split('/');
        const urlUserId = pathParts[2];
        if (urlUserId && urlUserId !== 'dashboard' && urlUserId !== 'expenses' && urlUserId !== 'income') {
            setUserId(urlUserId);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setMenuOpen(false);
        navigate('/login');
    };

    const getNavLink = (path) => {
        const basePath = path;
        const fullPath = userId ? `${basePath}/${userId}` : basePath;
        return fullPath;
    };

    return (
        <nav className="top-0 left-0 right-0 z-2000 bg-white shadow-lg">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
                {/* App Name */}
                <div className="flex items-center space-x-2">
                    <Link to={getNavLink('/dashboard')} className="font-bold text-2xl text-blue-600 hover:text-blue-700 transition-colors">
                        ExpenseTracker
                    </Link>
                </div>
                
                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link 
                        to={getNavLink('/dashboard')} 
                        className={`font-medium transition-colors ${location.pathname.includes('/dashboard') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to={getNavLink('/expenses')} 
                        className={`font-medium transition-colors ${location.pathname.includes('/expenses') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    >
                        Expenses
                    </Link>
                    <Link 
                        to={getNavLink('/income')} 
                        className={`font-medium transition-colors ${location.pathname.includes('/income') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                    >
                        Income
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="ml-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
                
                {/* Desktop User Profile */}
                <div className="hidden md:flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">{user?.name || 'User'}</span>
                    {userId && <span className="text-xs text-blue-600">({userId.slice(-6)})</span>}
                </div>
                
                {/* Mobile Hamburger */}
                <div className="md:hidden flex items-center">
                    <button
                        className={`flex flex-col justify-center items-center w-10 h-10 focus:outline-none transition-all duration-300 ${menuOpen ? 'rotate-90' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-blue-600 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                        <span className={`block w-6 h-0.5 bg-blue-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                        <span className={`block w-6 h-0.5 bg-blue-600 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed inset-0 z-999 bg-black bg-opacity-50 transition-opacity duration-300 ${menuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} 
                 onClick={() => setMenuOpen(false)}>
            </div>
            
            {/* Mobile Menu Slide-out */}
            <div className={`md:hidden fixed top-0 right-0 h-full z-1000 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <span className="font-bold text-xl text-blue-600">Menu</span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <span className="text-gray-500 text-xl">×</span>
                        </button>
                    </div>
                    
                    {/* User Profile Section */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
                                <p className="text-sm text-gray-500">Welcome back!</p>
                                {userId && <p className="text-xs text-blue-600">ID: {userId.slice(-6)}</p>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="flex-1 p-6 space-y-4">
                        <Link 
                            to={getNavLink('/dashboard')}
                            className={`flex items-center space-x-3 font-medium p-3 rounded-lg transition-all duration-200 ${
                                location.pathname.includes('/dashboard') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            </svg>
                            <span>Dashboard</span>
                        </Link>
                        
                        <Link 
                            to={getNavLink('/expenses')}
                            className={`flex items-center space-x-3 font-medium p-3 rounded-lg transition-all duration-200 ${
                                location.pathname.includes('/expenses') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Expenses</span>
                        </Link>
                        
                        <Link 
                            to={getNavLink('/income')}
                            className={`flex items-center space-x-3 font-medium p-3 rounded-lg transition-all duration-200 ${
                                location.pathname.includes('/income') 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Income</span>
                        </Link>
                    </div>
                    
                    {/* Logout Button */}
                    <div className="p-6 border-t border-gray-100">
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;