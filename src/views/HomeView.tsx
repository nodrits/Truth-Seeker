import React from 'react';
import { motion } from 'motion/react';
import { Flame, CheckCircle2, ChevronRight, BookOpen, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export default function HomeView() {
  const { profile } = useAuth();
  const today = format(new Date(), 'EEEE, MMMM do');

  const progress = 65; // Mock progress

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-8"
    >
      {/* Header section */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-brand-olive/60 uppercase tracking-widest">{today}</p>
          <h1 className="text-3xl font-display font-medium text-brand-olive italic">Today's Journey</h1>
          <p className="text-gray-500 text-sm">Welcome back, {profile?.displayName?.split(' ')[0] || 'Seeker'}</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-brand-olive/5">
          <Flame size={18} className="text-orange-500 fill-orange-500" />
          <span className="font-bold text-brand-olive">{profile?.streakCount || 0}</span>
        </div>
      </header>

      {/* Progress Card */}
      <section className="glass-card rounded-3xl p-5 space-y-4 shadow-lg shadow-brand-olive/5">
        <div className="flex justify-between items-end">
          <h3 className="font-semibold text-brand-olive">Daily Progress</h3>
          <span className="text-sm font-bold text-brand-olive">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-olive"
          />
        </div>
      </section>

      {/* Main Actions / Journey Cards */}
      <div className="grid gap-4">
        {/* Daily Verse */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-brand-olive rounded-3xl p-6 text-white text-center space-y-4 shadow-xl shadow-brand-olive/20"
        >
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-70">
            <span className="flex items-center gap-1"><BookOpen size={12} /> Your Verse</span>
            <span>Done</span>
          </div>
          <p className="text-xl font-serif italic leading-relaxed">
            "Your word is a lamp for my feet, a light on my path."
          </p>
          <p className="text-sm font-medium opacity-80">Psalm 119:105</p>
        </motion.div>

        {/* Reflection Card */}
        <JourneyCard 
          icon={<Sparkles size={20} className="text-purple-600" />}
          title="Daily Reflection"
          subtitle="Explore your heart"
          time="3 MIN"
          color="bg-purple-50"
        />

        {/* Prayer Card */}
        <JourneyCard 
          icon={<Heart size={20} className="text-pink-600" />}
          title="Guided Prayer"
          subtitle="Connect with God"
          time="1 MIN"
          color="bg-pink-50"
        />

        {/* Trivia Card */}
        <JourneyCard 
          icon={<BookOpen size={20} className="text-blue-600" />}
          title="Bible Trivia"
          subtitle="Test your knowledge"
          time="2 MIN"
          color="bg-blue-50"
        />
      </div>
    </motion.div>
  );
}

function JourneyCard({ icon, title, subtitle, time, color }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-between p-5 rounded-2xl ${color} cursor-pointer hover:shadow-md transition-all`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-xl shadow-sm">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-brand-olive uppercase tracking-tight text-xs">{title} • <span className="opacity-60">{time}</span></h4>
          <p className="text-gray-600 text-sm font-medium">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-brand-olive/40" />
    </motion.div>
  );
}
