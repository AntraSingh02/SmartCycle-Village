import React from 'react';
import { Map as MapIcon, Info, Navigation, ExternalLink } from 'lucide-react';
import routeData from '../data/routeResults.json';

export default function MapView() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-emerald-500" />
            GIS Map Visualization
          </h1>
          <p className="text-slate-500 mt-2">Interactive AI-optimized route visualization for 25 villages.</p>
        </div>
        <a 
          href="/route_map.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Open Full Map
        </a>
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-200 overflow-hidden">
        {/* Map Container - Embedding the Folium Map */}
        <div className="h-[750px] rounded-2xl overflow-hidden relative z-0">
          <iframe 
            src="/route_map.html" 
            title="GIS Route Optimization Map"
            className="w-full h-full border-none"
            loading="lazy"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-100 mb-4 flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Optimization Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-emerald-300 text-sm">Total Distance</span>
              <span className="text-2xl font-bold">{routeData.totalDistance} km</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-emerald-300 text-sm">Active Routes</span>
              <span className="text-2xl font-bold">{routeData.tours.length}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-emerald-300 text-sm">Avg. Distance/Truck</span>
              <span className="text-2xl font-bold">{Math.round(routeData.totalDistance / routeData.tours.length)} km</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            GIS Map Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="space-y-3">
              <p className="leading-relaxed">
                The map above displays high-fidelity street-level routing using the **Ant Colony Optimization (ACO)** algorithm combined with **OSRM (Open Source Routing Machine)** for real-world distances.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="font-medium text-slate-700">Hub: Aggregation Center</span>
              </div>
            </div>
            <div className="space-y-3 font-medium">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Algorithm</span>
                <span className="text-slate-800">Ant Colony Optimization (ACO)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">GIS Engine</span>
                <span className="text-slate-800">Leaflet.js + Folium (Python)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
