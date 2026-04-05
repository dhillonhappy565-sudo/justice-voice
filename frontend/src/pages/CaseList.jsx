import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const CaseList = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const { data } = await api.get('/cases');
                setCases(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch cases');
            } finally {
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading testimonies...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-5xl mx-auto px-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <Link to="/dashboard" className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">My Cases</h1>
                        <p className="text-slate-600">Review your securely stored testimonies.</p>
                    </div>
                    <Link to="/new-case" className="btn-primary flex items-center gap-2 w-max">
                        <FileText className="w-4 h-4" /> New Testimony
                    </Link>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">{error}</div>}

                {cases.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No testimonies yet</h3>
                        <p className="text-slate-500 mb-6">You haven't submitted any cases or testimonies yet.</p>
                        <Link to="/new-case" className="btn-secondary">Submit your first case</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {cases.map((c, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                                key={c._id} 
                            >
                                <Link to={`/cases/${c._id}`} className="block bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-indigo-100 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-slate-800 line-clamp-1">{c.title}</h3>
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            {c.type}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                                        {c.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-slate-500 transition-colors">
                                        <div className="flex items-center gap-1.5 mt-auto">
                                            <Calendar className="w-4 h-4" /> 
                                            {new Date(c.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Details <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CaseList;
