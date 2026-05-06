import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, MessageCircle, Heart, Map, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-sage max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24 h-screen">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-brand-olive/10 px-6 py-4 flex justify-between items-center z-50">
        <NavButton to="/" icon={<Home size={22} />} label="Today" />
        <NavButton to="/plans" icon={<Map size={22} />} label="Plans" />
        <NavButton to="/chat" icon={<MessageCircle size={22} />} label="Chat" />
        <NavButton to="/community" icon={<Heart size={22} />} label="Support" />
        <NavButton to="/profile" icon={<User size={22} />} label="Profile" />
      </nav>
    </div>
  );
}

function NavButton({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-olive' : 'text-gray-400'}`}
    >
      {({ isActive }) => (
        <>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className={`p-1 rounded-xl ${isActive ? 'bg-brand-olive/10' : ''}`}
          >
            {icon}
          </motion.div>
          <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
        </>
      )}
    </NavLink>
  );
}
