import { Link } from 'react-router-dom';
import { PlusCircle, List, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user.name}</h1>
                    <p className="text-slate-600">Securely manage and submit your testimonies here.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    
                    <motion.div whileHover={{ y: -5 }} className="card-container group hover:border-indigo-200 transition-colors cursor-pointer">
                        <Link to="/new-case" className="block h-full">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                                <PlusCircle className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-slate-800">Start New Testimony</h2>
                            <p className="text-slate-600 mb-6">Create a structured and secure testimony. You can add timeline events and upload evidence securely.</p>
                            <span className="text-indigo-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                                Get Started &rarr;
                            </span>
                        </Link>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="card-container group hover:border-indigo-200 transition-colors cursor-pointer">
                        <Link to="/cases" className="block h-full">
                            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                                <List className="w-8 h-8 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-3 text-slate-800">View My Cases</h2>
                            <p className="text-slate-600 mb-6">Review your submitted testimonies, download structured PDF reports, and check the status of your data.</p>
                            <span className="text-indigo-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                                View Cases &rarr;
                            </span>
                        </Link>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;
