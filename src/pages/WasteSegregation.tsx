import React from 'react';
import { ScanSearch, Info, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function WasteSegregation() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <ScanSearch className="w-8 h-8 text-emerald-500" />
            AI Waste Segregation
          </h1>
          <p className="text-slate-500 mt-2">Identify and categorize waste types using real-time AI recognition.</p>
        </div>
        <a 
          href="https://appcloudpy-9wevu6uune2qu9qptpajfs.streamlit.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Open Full Tool
        </a>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Tool Container */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-[750px] rounded-2xl overflow-hidden relative z-0 bg-slate-100 flex items-center justify-center">
              <iframe 
                src="https://appcloudpy-9wevu6uune2qu9qptpajfs.streamlit.app/" 
                title="AI Waste Segregation Tool"
                className="w-full h-full border-none"
                loading="lazy"
              />
              {/* Fallback info displayed if the iframe fails or while loading */}
              <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-8 text-center">
                <ShieldAlert className="w-16 h-16 text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Connection Check</h3>
                <p className="text-slate-500 mt-2 max-w-md">
                  Ensure the Segregation AI application is accessible to see the interactive recognition tool.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Categories Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              How it works
            </h3>
            <div className="space-y-4 text-sm text-slate-600">
              <p>Upload or capture a photo of waste items to instantly identify their category and processing method.</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-1 bg-emerald-100 p-1 h-5 w-5 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Recognizes 50+ plastic types</span>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 bg-emerald-100 p-1 h-5 w-5 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Hazardous material detection</span>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 bg-emerald-100 p-1 h-5 w-5 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Recyclability scoring</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold text-blue-100 mb-4">Recognition Classes</h3>
            <div className="space-y-2 text-sm text-blue-100">
              <div className="flex justify-between border-b border-blue-800 pb-2">
                <span>Recyclable</span>
                <span className="text-emerald-400 font-bold font-mono">CLASS_0</span>
              </div>
              <div className="flex justify-between border-b border-blue-800 pb-2">
                <span>Non-Recyclable</span>
                <span className="text-amber-400 font-bold font-mono">CLASS_1</span>
              </div>
              <div className="flex justify-between">
                <span>Hazardous</span>
                <span className="text-rose-400 font-bold font-mono">CLASS_2</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-blue-300 leading-relaxed italic">
              AI model trained on 10,000+ images of rural solid waste items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
