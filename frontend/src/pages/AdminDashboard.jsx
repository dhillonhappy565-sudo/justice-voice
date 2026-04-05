import { useState, useEffect } from 'react';
import { Users, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: [], cases: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('cases');

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [usersRes, casesRes] = await Promise.all([
                    api.get('/admin/users'),
                    api.get('/admin/cases')
                ]);
                setStats({ users: usersRes.data, cases: casesRes.data });
            } catch (err) {
                console.error('Failed to fetch admin data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-6">
                
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Control Panel</h1>

                {/* Stat Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-slate-900">{stats.cases.length}</p>
                            <p className="text-slate-500 font-medium h-4 mt-2">Total Cases Submitted</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                            <Users className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-slate-900">{stats.users.length}</p>
                            <p className="text-slate-500 font-medium h-4 mt-2">Registered Users</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-200 mb-8">
                    <button 
                        onClick={() => setActiveTab('cases')}
                        className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'cases' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Manage Cases
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Manage Users
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {activeTab === 'cases' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Ref ID</th>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {stats.cases.map(c => (
                                        <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500">{c._id.substring(18)}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{c.title}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-medium">{c.type}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-800">{c.userId?.name || 'Unknown'}</span>
                                                    <span className="text-xs text-slate-500">{c.userId?.email || ''}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                <Link to={`/cases/${c._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1">
                                                    View <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">User ID</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Role</th>
                                        <th className="px-6 py-4">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {stats.users.map(u => (
                                        <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-500">{u._id.substring(18)}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{u.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{u.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
