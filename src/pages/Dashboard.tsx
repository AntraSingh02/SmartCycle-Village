import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Truck, Recycle, Award, Leaf, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { villages, plasticTypes, initialReports, WasteReport } from '../data/mockData';
import routeData from '../data/routeResults.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [reports, setReports] = useState<WasteReport[]>(initialReports);

  useEffect(() => {
    const saved = localStorage.getItem('wasteReports');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse reports');
      }
    }
  }, []);

  // Chart Data Preparation
  const barData = {
    labels: villages.slice(0, 10).map(v => v.name),
    datasets: [
      {
        label: 'Plastic Collected (kg)',
        data: villages.slice(0, 10).map(v => v.wasteAmount),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: plasticTypes,
    datasets: [
      {
        data: [45, 25, 20, 10], // Simulated distribution
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // emerald
          'rgba(59, 130, 246, 0.8)', // blue
          'rgba(245, 158, 11, 0.8)', // amber
          'rgba(139, 92, 246, 0.8)', // purple
        ],
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Collection (kg)',
        data: [350, 420, 510, 580, 640, routeData.totalCollected], 
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const sortedVillages = [...villages].sort((a, b) => b.greenPoints - a.greenPoints).slice(0, 5);
  const predictedVillages = [...villages].sort((a, b) => b.predictedWaste - a.predictedWaste).slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-emerald-500" />
          Government Analytics Dashboard
        </h1>
        <p className="text-slate-500 mt-2">Real-time monitoring of rural plastic waste collection and system efficiency.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
              <Recycle className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Collected</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{routeData.totalCollected} <span className="text-lg font-normal text-slate-500">kg</span></p>
          <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12% from last month
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <Truck className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">Avg Route Distance</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{Math.round(routeData.totalDistance / routeData.tours.length)} <span className="text-lg font-normal text-slate-500">km</span></p>
          <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> Optimized Routes
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
              <Leaf className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">Est. Fuel Savings</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{Math.round(routeData.fuelEstimate)} <span className="text-lg font-normal text-slate-500">Liters</span></p>
          <p className="text-sm text-slate-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">Active Villages</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{villages.length} <span className="text-lg font-normal text-slate-500">/ 25</span></p>
          <p className="text-sm text-slate-500 mt-2">Full pilot active</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Plastic Collected per Village</h3>
          <div className="h-[300px]">
            <Bar 
              data={barData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
              }} 
            />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Waste Composition</h3>
          <div className="h-[250px] flex justify-center">
            <Pie 
              data={pieData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </div>
        </div>

        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Monthly Collection Trend</h3>
          <div className="h-[300px]">
            <Line 
              data={lineData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
              }} 
            />
          </div>
        </div>

        {/* Leaderboard & Prediction */}
        <div className="space-y-8">
          {/* Leaderboard */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Green Points Leaderboard
            </h3>
            <div className="space-y-4">
              {sortedVillages.map((v, idx) => (
                <div key={v.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-amber-100 text-amber-700' : idx === 1 ? 'bg-slate-200 text-slate-700' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                      {idx + 1}
                    </span>
                    <span className="font-medium text-slate-900">{v.name}</span>
                  </div>
                  <span className="font-bold text-emerald-600">{v.greenPoints} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Prediction */}
          <div className="bg-indigo-50 rounded-3xl p-6 shadow-sm border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI Waste Prediction
            </h3>
            <p className="text-sm text-indigo-700 mb-4">Forecast for next week based on historical data.</p>
            <div className="space-y-3">
              {predictedVillages.map(v => (
                <div key={v.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                  <span className="font-medium text-slate-900">{v.name}</span>
                  <span className="text-indigo-600 font-bold">{v.predictedWaste} kg expected</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visual Submissions */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mt-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Camera className="w-6 h-6 text-emerald-500" />
          Recent Waste Reports
        </h3>
        <p className="text-slate-500 mb-6 text-sm">Real-time user submissions from villages.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reports.map((report) => {
            const village = villages.find(v => v.id === report.villageId);
            return (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex flex-col shadow-sm"
              >
                <div className="h-48 bg-slate-200 relative group">
                  {report.imageUrl ? (
                    <img src={report.imageUrl} alt="Waste report" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-400 flex-col gap-2">
                      <Camera className="w-8 h-8 opacity-40" />
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-bold text-slate-900">{village?.name || 'Unknown Village'}</h4>
                    <p className="text-sm text-slate-500 mt-1">{report.plasticType}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg text-sm border border-emerald-100">
                      {report.weight} kg
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {reports.length === 0 && (
            <p className="text-slate-500 col-span-full">No recent waste reports available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
