import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, Navigation, Fuel, Package, Clock, CheckCircle2 } from 'lucide-react';
import routeData from '../data/routeResults.json';

interface RouteSegment {
  from: string;
  to: string;
  distance: number;
  pickup: number;
}

interface Tour {
  id: string;
  driverName: string;
  vehicleId: string;
  path: string[];
  wasteCollected: number;
  distance: number;
  estimatedTimeMins: number;
  status: string;
  segments?: RouteSegment[]; // Optional if we want to add later
}

interface RouteResult {
  status: string;
  totalDistance: number;
  totalCollected: number;
  fuelEstimate: number;
  capacity: number;
  tours: Tour[];
}

export default function Routes() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

  const optimizeRoute = () => {
    setIsOptimizing(true);
    setRouteResult(null);

    // Simulate AI API call delay
    setTimeout(() => {
      setRouteResult(routeData as RouteResult);
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Truck className="w-8 h-8 text-emerald-500" />
            Collector Route Optimization
          </h1>
          <p className="text-slate-500 mt-2">AI-powered vehicle routing to minimize distance and maximize collection across 7 assigned trucks.</p>
        </div>
        <button
          onClick={optimizeRoute}
          disabled={isOptimizing}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isOptimizing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Optimizing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Generate Optimal Routes
            </span>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Route Details */}
        <div className="lg:col-span-2 space-y-6">
          {routeResult ? (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Optimal Routes Generated</h2>
                  <p className="text-slate-500">Successfully planned 7 distinct tours for the fleet.</p>
                </div>
              </div>

              {routeResult.tours.map((tour, idx) => (
                <motion.div 
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-600" />
                        {tour.vehicleId}
                      </h3>
                      <p className="text-slate-500 mt-1">Driver: {tour.driverName}</p>
                    </div>
                    <div className="flex gap-4 text-sm font-medium bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Distance</span>
                        <span className="text-slate-700">{tour.distance} km</span>
                      </div>
                      <div className="h-full w-px bg-slate-200"></div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Load</span>
                        <span className="text-slate-700">{tour.wasteCollected} kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-emerald-100"></div>
                    
                    <div className="space-y-4 relative z-10 overflow-x-auto pb-4 custom-scrollbar">
                      <div className="flex items-center whitespace-nowrap gap-4 min-w-max">
                        {tour.path.map((stop, sIdx) => {
                          const isHub = stop === 'Hub';
                          return (
                            <div key={`${stop}-${sIdx}`} className="flex items-center">
                              <div className="flex flex-col items-center group">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-110 ${isHub ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {isHub ? <Truck className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                                </div>
                                <span className={`text-sm mt-3 font-medium ${isHub ? 'text-slate-900' : 'text-slate-600'}`}>{stop}</span>
                              </div>
                              {sIdx < tour.path.length - 1 && (
                                <div className="h-1 w-16 bg-slate-100 mx-2 flex-shrink-0 relative top-[-10px]">
                                  <div className="absolute inset-0 bg-emerald-100 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-12 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-slate-400">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Routes Generated</h3>
              <p className="text-slate-500 max-w-sm">Click the "Generate Optimal Routes" button to load the AI routing algorithm output based on current village waste data.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-8">
          {/* Metrics Card */}
          <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-800 rounded-full opacity-50 blur-xl"></div>
            <h3 className="text-lg font-semibold text-emerald-100 mb-6 relative z-10">Route Summary</h3>
            
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-emerald-300 text-sm mb-1 flex items-center gap-2">
                  <Navigation className="w-4 h-4" /> Total Distance
                </p>
                <p className="text-3xl font-bold">{routeResult ? routeResult.totalDistance : '--'} <span className="text-lg font-normal text-emerald-200">km</span></p>
              </div>
              
              <div>
                <p className="text-emerald-300 text-sm mb-1 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Plastic Collected
                </p>
                <p className="text-3xl font-bold">{routeResult ? routeResult.totalCollected : '--'} <span className="text-lg font-normal text-emerald-200">kg</span></p>
              </div>

              <div>
                <p className="text-emerald-300 text-sm mb-1 flex items-center gap-2">
                  <Fuel className="w-4 h-4" /> Est. Fuel Saved
                </p>
                <p className="text-3xl font-bold">{routeResult ? routeResult.fuelEstimate : '--'} <span className="text-lg font-normal text-emerald-200">L</span></p>
              </div>
            </div>
          </div>

          {/* Collector Daily Route Cards */}
          {routeResult && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pt-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Collector Assignments
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {routeResult.tours.map((tour) => (
                  <div key={`sidebar-${tour.id}`} className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] border border-slate-200 hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-slate-900">{tour.driverName}</p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{tour.vehicleId}</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
                        {tour.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Distance</p>
                        <p className="font-semibold text-slate-700">{tour.distance} km</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Est. Time</p>
                        <p className="font-semibold text-slate-700">{tour.estimatedTimeMins} min</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${(tour.wasteCollected / routeResult.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-xs font-medium text-slate-500">Collected: <span className="text-slate-800">{tour.wasteCollected} kg</span></p>
                        <p className="text-[10px] text-slate-400">Cap: {routeResult.capacity} kg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
