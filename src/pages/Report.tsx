import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Upload, Camera, Leaf, Image as ImageIcon } from 'lucide-react';
import { villages, plasticTypes, initialReports, WasteReport } from '../data/mockData';

export default function Report() {
  const [reports, setReports] = useState<WasteReport[]>(() => {
    const saved = localStorage.getItem('wasteReports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialReports;
      }
    }
    return initialReports;
  });
  
  useEffect(() => {
    localStorage.setItem('wasteReports', JSON.stringify(reports));
  }, [reports]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    villageId: '',
    plasticType: '',
    weight: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let uploadedImageUrl: string | undefined = undefined;

    if (selectedFile) {
      const imgData = new FormData();
      imgData.append('image', selectedFile);
      
      try {
        const res = await fetch('https://api.imgbb.com/1/upload?key=8b82ccff9ec9967bbdd2489a77c0d417', {
          method: 'POST',
          body: imgData
        });
        const result = await res.json();
        if (result.success) {
          uploadedImageUrl = result.data.url;
        }
      } catch (error) {
        console.error('Image upload failed', error);
      }
    }

    const newReport: WasteReport = {
      id: `r${Date.now()}`,
      villageId: formData.villageId,
      plasticType: formData.plasticType,
      weight: Number(formData.weight),
      date: new Date().toISOString(),
      imageUrl: uploadedImageUrl,
    };
    
    setReports(prev => [newReport, ...prev]);
    setIsSubmitting(false);
    setSuccessMessage('Plastic waste report successfully logged.');
    setFormData({ villageId: '', plasticType: '', weight: '' });
    setSelectedFile(null);
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-500" />
            Report Plastic Waste
          </h2>
          <p className="text-slate-500 mt-2">Log new plastic collection from village points.</p>
        </div>

        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-3 border border-emerald-100"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="font-medium">{successMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="village" className="block text-sm font-medium text-slate-700 mb-2">
              Village Name
            </label>
            <select
              id="village"
              required
              value={formData.villageId}
              onChange={(e) => setFormData({ ...formData, villageId: e.target.value })}
              className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="" disabled>Select a village</option>
              {villages.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
              Plastic Type
            </label>
            <select
              id="type"
              required
              value={formData.plasticType}
              onChange={(e) => setFormData({ ...formData, plasticType: e.target.value })}
              className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="" disabled>Select plastic type</option>
              {plasticTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-slate-700 mb-2">
              Estimated Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              required
              min="0.1"
              step="0.1"
              placeholder="e.g. 25.5"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload Photo (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-xl hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              <div className="space-y-1 text-center">
                {selectedFile ? (
                  <ImageIcon className="mx-auto h-12 w-12 text-emerald-500" />
                ) : (
                  <Camera className="mx-auto h-12 w-12 text-slate-400" />
                )}
                <div className="flex text-sm text-slate-600 justify-center">
                  <span className="relative font-medium text-emerald-600">
                    {selectedFile ? selectedFile.name : 'Upload a file or drag and drop'}
                  </span>
                </div>
                {!selectedFile && <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>

      {/* Recent Reports Section */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Reports</h3>
        <div className="space-y-4">
          {reports.map((report) => {
            const village = villages.find(v => v.id === report.villageId);
            return (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{village?.name || 'Unknown'}</p>
                    <p className="text-sm text-slate-500">{report.plasticType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{report.weight} kg</p>
                  <p className="text-xs text-slate-400">
                    {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
