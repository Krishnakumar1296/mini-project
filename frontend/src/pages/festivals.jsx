import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Globe, User, X, LogOut } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Festivals = () => {
  const [lang, setLang] = useState('en');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Trip Planner", path: "/planner" },
    { name: "Place Finder", path: "/finder" },
    { name: "Festivals", path: "/festivals" },
  ].filter(link => link.name !== "Festivals");

  const events = [
    { name: "Chithirai Festival", date: "April 2026", location: "Madurai", status: "Upcoming" },
    { name: "Natyanjali Dance Festival", date: "March 2026", location: "Chidambaram", status: "Upcoming" },
    { name: "Jallikattu Events", date: "Jan 2026", location: "Alanganallur", status: "Completed" },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. TOP NAVBAR */}
      <nav className="fixed w-[94%] left-[3%] top-6 z-50 glass px-8 py-4 flex justify-between items-center border-white/10 shadow-xl">
        <div className="flex items-center gap-2">
          <motion.img whileHover={{ rotate: 180 }} src="https://img.icons8.com/color/48/lotus.png" className="w-8 h-8" alt="logo" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic text-white">TN Flow</span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-xs font-black uppercase tracking-widest text-white/70 hover:text-cyan-400 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} className="text-white/70 hover:text-cyan-400 cursor-pointer text-white">
            <Globe size={22}/>
          </button>
          <button 
            onClick={() => setIsProfileOpen(true)} 
            className="flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all active:scale-95"
          >
            <User size={20} className="text-cyan-400" /> 
            <span className="font-bold text-xs uppercase hidden sm:inline">Profile</span>
          </button>
        </div>
      </nav>

      {/* 2. PROFILE SIDEBAR - RESTORED FIX */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsProfileOpen(false)} 
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 glass z-[70] p-10 flex flex-col border-l border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12 text-white">
                <h2 className="text-2xl font-black uppercase tracking-widest">Profile</h2>
                <button onClick={() => setIsProfileOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 space-y-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-white/20 mb-4 text-white">
                    <User size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter">TN Traveler</h3>
                  <p className="text-white/40 text-xs mt-1">user.tnflow@example.com</p>
                </div>
              </div>

              <button 
                onClick={() => signOut(auth).then(() => navigate("/"))} 
                className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-lg"
              >
                <LogOut size={16}/> Sign Out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. FESTIVALS CONTENT */}
      <main className="pt-44 pb-20 px-6 max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-2">Festival Finder</h1>
        <p className="text-white/60 mb-10 font-medium">Don't miss the vibrant colors of TN culture.</p>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }} 
              className="glass p-6 flex flex-col md:flex-row items-center justify-between border-white/10 gap-6 shadow-lg"
            >
              <div className="flex items-center gap-6 text-white w-full">
                <div className={`p-4 rounded-2xl ${event.status === 'Upcoming' ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-white/5 text-white/20'}`}>
                  <Calendar size={28}/>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p className="text-sm opacity-50 flex items-center gap-1 mt-1 font-medium">
                    <MapPin size={14}/> {event.location} • {event.date}
                  </p>
                </div>
              </div>
              <button className={`btn-pill py-3 px-8 text-[10px] tracking-[0.2em] font-black transition-all ${event.status === 'Upcoming' ? 'bg-cyan-400 text-black hover:bg-cyan-300' : 'bg-white/5 text-white/30 cursor-not-allowed'}`}>
                {event.status === 'Upcoming' ? 'Notify Me' : 'Ended'}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Festivals;