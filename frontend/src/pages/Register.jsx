import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }
        if (formData.password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', { 
                name: formData.name, 
                email: formData.email, 
                password: formData.password 
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create your account</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in instead</Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="card-container">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                            {error}
                        </div>
                    )}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input 
                                name="name" type="text" required 
                                className="input-field"
                                value={formData.name} onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                            <input 
                                name="email" type="email" required 
                                className="input-field"
                                value={formData.email} onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input 
                                name="password" type="password" required 
                                className="input-field"
                                value={formData.password} onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                            <input 
                                name="confirmPassword" type="password" required 
                                className="input-field"
                                value={formData.confirmPassword} onChange={handleChange}
                            />
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center py-2.5 mt-6">
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
