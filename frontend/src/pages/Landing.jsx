import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8"
                >
                    <Lock className="w-4 h-4" /> Secure & Encrypted Platform
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.1 }}
                    className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6"
                >
                    Every Story Deserves <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">To Be Heard</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 }}
                    className="text-lg lg:text-xl text-slate-600 max-w-2xl mb-10"
                >
                    A secure, trauma-informed digital platform to submit your testimony safely. Your voice matters, and we are here to listen and protect it.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link to="/register" className="btn-primary text-lg px-8 py-3">
                        Start Testimony
                    </Link>
                    <a href="#features" className="btn-secondary text-lg px-8 py-3">
                        Learn More
                    </a>
                </motion.div>

            </div>

            {/* Features Section */}
            <div id="features" className="bg-white w-full py-24 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-800">Secure & Private</h3>
                        <p className="text-slate-600">Your data is encrypted. We ensure that your testimonies are kept strictly confidential.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                            <HeartHandshake className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-800">Trauma-Informed</h3>
                        <p className="text-slate-600">Our platform is designed to be gentle, supportive, and accessible without causing additional distress.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-800">Verified Evidence</h3>
                        <p className="text-slate-600">Upload and structure your evidence securely to support your case effectively.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
