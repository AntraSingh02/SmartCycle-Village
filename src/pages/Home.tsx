import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Leaf, Map, Recycle, Truck, Users, Home as HomeIcon } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Villages Connected', value: '25', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Plastic Collected', value: '700 kg', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Fuel Saved', value: '52 L', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Recycling Rate', value: '85%', icon: Recycle, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const steps = [
  { title: 'Households', desc: 'Waste segregation at source', icon: HomeIcon },
  { title: 'Collection Points', desc: 'Village-level aggregation', icon: Users },
  { title: 'AI Route Optimization', desc: 'Smart collector dispatch', icon: Truck },
  { title: 'Aggregation Center', desc: 'Sorting and processing', icon: Map },
  { title: 'Recycler', desc: 'Re-manufacturing', icon: Recycle },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-emerald-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-24 lg:px-24 lg:py-32 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            AI-Powered Rural Plastic <br className="hidden sm:block" />
            <span className="text-emerald-400">Circular Economy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-emerald-100 mb-10 max-w-2xl leading-relaxed"
          >
            Transforming rural waste management by connecting villages, optimizing collection routes with AI, and empowering local communities to build a sustainable future.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/dashboard" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-emerald-900 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/30">
              View Dashboard
              <BarChart3 className="ml-2 -mr-1 w-5 h-5" />
            </Link>
            <Link to="/routes" className="inline-flex items-center justify-center px-6 py-3 border border-emerald-400 text-base font-medium rounded-xl text-emerald-50 hover:bg-emerald-800 transition-colors">
              Collector Portal
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4"
              >
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Challenge in Rural Areas</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Many rural areas lack structured plastic waste collection systems. Plastic is often burned or dumped, causing severe environmental and health hazards.
            </p>
            <p>
              Waste collectors follow inefficient manual routes, wasting fuel and time, making rural collection economically unviable.
            </p>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Our Smart Solution</h2>
          <ul className="space-y-4">
            {[
              'Enable village-level plastic waste reporting via mobile',
              'Optimize waste collection routes using AI algorithms',
              'Connect collectors, Self-Help Groups (SHGs), and recyclers',
              'Provide real-time dashboards for government monitoring'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1 bg-emerald-200 p-1 rounded-full text-emerald-700">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-emerald-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Circular Economy Flow */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Circular Economy Model</h2>
        <p className="text-slate-500 mb-12 max-w-2xl mx-auto">How plastic moves through our system from households to re-manufacturing.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2"></div>
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center relative z-10 bg-white p-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-600 mb-4 shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-[120px]">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="md:hidden text-slate-300 py-2">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
}
