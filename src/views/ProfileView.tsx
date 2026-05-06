import React from 'react';
import { motion } from 'motion/react';
import { Settings, LogOut, Award, Calendar, Bell, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfileView() {
  const { profile, logout } = useAuth();

  const badges = [
    { name: "3 Day Streak", icon: "🔥", date: "2 days ago" },
    { name: "Prayer Warrior", icon: "🙏", date: "5 days ago" },
    { name: "Bible Scholar", icon: "📖", date: "Joined" },
  ];

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-medium text-brand-olive italic">Profile</h1>
        <button className="p-2 text-brand-olive/60 hover:text-brand-olive transition-colors">
          <Settings size={22} />
        </button>
      </header>

      {/* User Info Card */}
      <section className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-brand-olive/10 flex items-center justify-center">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt={profile.displayName || ''} className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-brand-olive/40" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-brand-gold p-1.5 rounded-full border-2 border-white text-white">
            <Award size={16} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-brand-olive">{profile?.displayName || 'Faithful Soul'}</h2>
          <p className="text-gray-500 text-sm font-medium">{profile?.email}</p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Streak</p>
          <p className="text-2xl font-display font-bold text-brand-olive">{profile?.streakCount || 0} Days</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Prayers</p>
          <p className="text-2xl font-display font-bold text-brand-olive">12</p>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-semibold text-brand-olive">Collection</h3>
          <span className="text-xs font-bold text-brand-gold uppercase">View all</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {badges.map((badge, i) => (
            <div key={i} className="min-w-[100px] glass-card rounded-2xl p-4 flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{badge.icon}</span>
              <p className="text-[10px] font-bold text-brand-olive leading-tight">{badge.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Options */}
      <section className="space-y-3">
        <ProfileMenuItem icon={<Bell size={18} />} title="Notifications" />
        <ProfileMenuItem icon={<Calendar size={18} />} title="Reminder Settings" />
        <ProfileMenuItem 
          icon={<LogOut size={18} className="text-red-500" />} 
          title="Sign Out" 
          onClick={logout}
          isLast
        />
      </section>
    </div>
  );
}

function ProfileMenuItem({ icon, title, onClick, isLast }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white/50 hover:bg-white rounded-2xl transition-all ${isLast ? 'text-red-500' : 'text-brand-olive'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${isLast ? 'bg-red-50' : 'bg-brand-olive/5'}`}>
          {icon}
        </div>
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <ChevronRight size={18} className="opacity-20" />
    </button>
  );
}
