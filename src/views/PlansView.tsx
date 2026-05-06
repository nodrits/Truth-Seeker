import React from 'react';
import { motion } from 'motion/react';
import { READING_PLANS } from '../constants';
import { ChevronRight, Clock, BookOpen, Users, Search } from 'lucide-react';

export default function PlansView() {
  const categories = ["All Plans", "My Library", "Completed", "Anxiety", "Strenght"];

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium text-brand-olive/60 uppercase tracking-widest">Library</p>
          <h1 className="text-3xl font-display font-medium text-brand-olive italic">Study Plans</h1>
        </div>
        <button className="p-2 bg-white rounded-full shadow-sm border border-brand-olive/5 text-brand-olive/60">
          <Search size={22} />
        </button>
      </header>

      {/* Categories Scroller */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat, i) => (
          <button 
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${i === 0 ? 'bg-brand-olive text-white shadow-lg shadow-brand-olive/20' : 'bg-white text-gray-500 border border-brand-olive/5 hover:border-brand-olive/20'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-display font-medium text-xl text-brand-olive italic">Featured Journeys</h2>
          <button className="text-xs font-bold text-brand-gold uppercase tracking-wider">See all</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {READING_PLANS.map((plan) => (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-brand-olive/5 border border-brand-olive/5 cursor-pointer group"
            >
              <div className="relative h-32">
                <img src={plan.imageUrl} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-brand-olive shadow-sm">
                  {plan.durationDays} DAYS
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm text-brand-olive leading-tight h-10 overflow-hidden">{plan.title}</h3>
                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500">
                  <Users size={12} />
                  <span>1.2k studying</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display font-medium text-xl text-brand-olive italic">Reading Plans</h2>
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 flex gap-4 items-center cursor-pointer">
            <div className="w-16 h-16 bg-brand-olive/5 rounded-xl flex items-center justify-center text-brand-olive">
              <BookOpen size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-brand-olive">Read Through The Gospels</h4>
              <p className="text-xs text-gray-500">30 DAYS • 45k reading</p>
            </div>
            <ChevronRight size={20} className="text-brand-olive/20" />
          </div>
          
          <div className="glass-card rounded-2xl p-4 flex gap-4 items-center cursor-pointer opacity-80">
            <div className="w-16 h-16 bg-brand-olive/5 rounded-xl flex items-center justify-center text-brand-olive text-brand-olive">
              <Clock size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-brand-olive">The Bible In A Year</h4>
              <p className="text-xs text-gray-500">365 DAYS • 120k reading</p>
            </div>
            <ChevronRight size={20} className="text-brand-olive/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
