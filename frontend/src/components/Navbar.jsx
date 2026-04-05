import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        JusticeVoice
                    </span>
                </Link>

                <div className="flex gap-4 items-center">
                    {!token ? (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-slate-600 hover:text-indigo-600 font-medium transition">
                                {user?.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                            </Link>
                            <button onClick={handleLogout} className="text-slate-600 hover:text-red-500 font-medium transition">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
