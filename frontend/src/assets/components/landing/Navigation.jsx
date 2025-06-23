import { Link } from "react-router-dom";
const Navigation = () => {
    return(

        <nav className="container mx-auto px-6 py-4 fixed bg-white/80 backdrop-blur-md shadow-sm z-1001 ">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Link to="/" className="font-bold text-xl text-gray-800">ExpenseTracker</Link>
            </div>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                Sign In
            </Link>
            </div>
        </nav>
    );
}

export default Navigation