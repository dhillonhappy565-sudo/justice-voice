import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Paperclip, Calendar, MapPin, Info } from 'lucide-react';
import api from '../services/api';

const CaseDetail = () => {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const { data } = await api.get(`/cases/${id}`);
                setCaseData(data);
            } catch (err) {
                setError('Failed to fetch case details');
            } finally {
                setLoading(false);
            }
        };
        fetchCase();
    }, [id]);

    const handleDownloadReport = async () => {
        setDownloading(true);
        try {
            const response = await api.get(`/cases/${id}/report`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Case_Report_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            alert("Failed to download report");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading case...</div>;
    if (error) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                
                <div className="flex items-center justify-between mb-8">
                    <Link to="/cases" className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Cases
                    </Link>
                    <button 
                        onClick={handleDownloadReport} 
                        disabled={downloading}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        {downloading ? 'Generating PDF...' : 'Download Report'}
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                        <span className="inline-block bg-white/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-4 tracking-wide uppercase">
                            {caseData.type}
                        </span>
                        <h1 className="text-3xl font-bold mb-4">{caseData.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(caseData.createdAt).toLocaleDateString()}</div>
                            {caseData.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {caseData.location}</div>}
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Testimony Description</h3>
                            <div className="bg-slate-50 p-6 rounded-xl text-slate-700 leading-relaxed max-w-none">
                                {caseData.description.split('\n').map((line, i) => <p key={i} className="mb-2 last:mb-0">{line}</p>)}
                            </div>
                        </div>

                        {(caseData.involvedParties || caseData.additionalDetails) && (
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                {caseData.involvedParties && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Involved Parties</h3>
                                        <p className="text-slate-700 bg-white border border-slate-100 rounded-xl p-4">{caseData.involvedParties}</p>
                                    </div>
                                )}
                                {caseData.additionalDetails && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Additional Details</h3>
                                        <p className="text-slate-700 bg-white border border-slate-100 rounded-xl p-4">{caseData.additionalDetails}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {caseData.evidence && caseData.evidence.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2 mb-4">Attached Evidence</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {caseData.evidence.map((ev, idx) => (
                                        <a href={`http://localhost:5000${ev.fileUrl}`} target="_blank" rel="noreferrer" key={idx} 
                                           className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-200 transition-colors group">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100">
                                                <Paperclip className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{ev.originalName}</p>
                                                <p className="text-xs text-slate-500 uppercase">{ev.fileType.split('/')[1]}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CaseDetail;
