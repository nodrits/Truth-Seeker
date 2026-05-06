import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Heart, BookOpen, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginView() {
  const { signIn } = useAuth();

  return (
    <div className="min-h-screen bg-brand-sage flex flex-col p-8 space-y-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-24 h-24 bg-brand-olive rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-brand-olive/30 transform -rotate-6">
            <BookOpen size={48} />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 text-brand-gold"
          >
            <Sparkles size={32} />
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-5xl font-display font-medium text-brand-olive leading-tight">
            Faith Journey
          </h1>
          <p className="text-gray-500 max-w-xs mx-auto text-lg leading-relaxed font-serif italic">
            "Your daily companion for a deeper walk with the Word."
          </p>
        </div>

        <div className="space-y-4 w-full pt-8">
          <FeatureItem icon={<MessageCircle size={18} />} text="AI Bible Tutor" />
          <FeatureItem icon={<Heart size={18} />} text="Daily Guided Prayers" />
          <FeatureItem icon={<Crown size={18} />} text="Personalized Plans" />
        </div>
      </div>

      <div className="space-y-6">
        <button 
          onClick={signIn}
          className="w-full bg-white text-gray-800 font-bold py-5 rounded-3xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-4 border-2 border-brand-olive/5"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>
        <p className="text-center text-xs text-gray-400 font-medium tracking-tight">
          BY CONTINUING, YOU AGREE TO OUR <span className="underline">TERMS OF SERVICE</span>
        </p>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: any) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex items-center justify-center gap-3 text-brand-olive/80 font-semibold text-sm uppercase tracking-widest"
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <span>{text}</span>
    </motion.div>
  );
}
