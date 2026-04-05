import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const NewCase = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '', type: 'Harassment', date: '', location: '',
        description: '', involvedParties: '', additionalDetails: ''
    });

    const [files, setFiles] = useState([]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        files.forEach(file => data.append('evidence', file));

        try {
            await api.post('/cases', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/cases');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit testimony');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-6">
                
                <Link to="/dashboard" className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <div className="card-container">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                        Submit a Testimony
                    </h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Stepper logic */}
                    <div className="flex items-center mb-8">
                        {[1, 2, 3, 4].map(num => (
                            <div key={num} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= num ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {step > num ? <CheckCircle className="w-5 h-5 text-white" /> : num}
                                </div>
                                {num < 4 && <div className={`h-1 w-12 sm:w-24 ${step > num ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                        
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-xl font-semibold mb-4 text-slate-800">Basic Information</h3>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Case Title</label>
                                    <input required type="text" name="title" className="input-field" value={formData.title} onChange={handleChange} placeholder="A short title for this incident"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Incident Type</label>
                                    <select name="type" className="input-field" value={formData.type} onChange={handleChange}>
                                        <option>Harassment</option>
                                        <option>Assault</option>
                                        <option>Discrimination</option>
                                        <option>Domestic Violence</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Date (Optional)</label>
                                        <input type="date" name="date" className="input-field" value={formData.date} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Location (Optional)</label>
                                        <input type="text" name="location" className="input-field" value={formData.location} onChange={handleChange} placeholder="E.g., Office Building A" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-xl font-semibold mb-4 text-slate-800">Testimony Input</h3>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">What happened?</label>
                                    <textarea required rows="5" name="description" className="input-field resize-none block w-full" value={formData.description} onChange={handleChange} placeholder="Describe the incident in detail..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Who was involved? (Optional)</label>
                                    <input type="text" name="involvedParties" className="input-field" value={formData.involvedParties} onChange={handleChange} placeholder="Names or roles of individuals involved" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Additional details (Optional)</label>
                                    <textarea rows="3" name="additionalDetails" className="input-field block w-full resize-none" value={formData.additionalDetails} onChange={handleChange} placeholder="Any other context or information" />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-xl font-semibold mb-4 text-slate-800">Evidence Upload</h3>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                                    <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                    <label className="cursor-pointer">
                                        <span className="text-indigo-600 font-medium hover:text-indigo-700">Upload a file</span>
                                        <span className="text-slate-500"> or drag and drop</span>
                                        <input type="file" multiple accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
                                    </label>
                                    <p className="text-xs text-slate-400 mt-2">Images and PDFs up to 10MB each</p>
                                </div>
                                {files.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-slate-700 mb-2">Selected files:</p>
                                        <ul className="text-sm text-slate-600 list-disc pl-5">
                                            {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-xl font-semibold mb-4 text-slate-800">Review & Submit</h3>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-2">{formData.title || 'Untitled Case'}</h4>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">{formData.type}</span>
                                    
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <p className="text-sm text-slate-500 mb-1">Description</p>
                                            <p className="text-sm text-slate-800 bg-white p-3 rounded border border-slate-100">{formData.description || 'No description provided.'}</p>
                                        </div>
                                        {formData.location && <p className="text-sm text-slate-700"><span className="text-slate-500">Location:</span> {formData.location}</p>}
                                        {files.length > 0 && <p className="text-sm text-slate-700"><span className="text-slate-500">Files attached:</span> {files.length}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="btn-secondary">Back</button>
                            ) : <div></div>}
                            
                            {step < 4 ? (
                                <button type="submit" className="btn-primary">Next Step</button>
                            ) : (
                                <button type="submit" disabled={loading} className="btn-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                                    {loading ? 'Submitting secure case...' : 'Submit Testimony'}
                                </button>
                            )}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default NewCase;
