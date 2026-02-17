import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Search, User, LogOut, X, Globe, Calendar, Menu, Mail, Phone } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

// --- Typewriter Logic ---
const Typewriter = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else { clearInterval(timer); }
    }, 40);
    return () => clearInterval(timer);
  }, [text]);
  return <span className="text-white/80">{displayedText}</span>;
};

const Home = () => {
  const [lang, setLang] = useState('en');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [12, -12]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-12, 12]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 200);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 200);
  };

  const features = [
    { 
      title: lang === 'en' ? "Trip Planner" : "பயணத் திட்டம்", 
      path: "/planner",
      desc: "Let AI design your perfect Tamil Nadu journey, optimized for time and beauty.", 
      icon: <Compass size={48} /> 
    },
    { 
      title: lang === 'en' ? "Place Finder" : "இடங்கள்", 
      path: "/finder",
      desc: "Unlock hidden gems from the Nilgiris to the temple towers of Madurai.", 
      icon: <Search size={48} /> 
    },
    { 
      title: lang === 'en' ? "Festival Finder" : "திருவிழாக்கள்", 
      path: "/festivals",
      desc: "Live updates on temple festivals, cultural events, and local celebrations.", 
      icon: <Calendar size={48} /> 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex(p => (p + 1) % features.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen selection:bg-cyan-500/30">
      
      {/* 1. TOP NAVBAR */}
      <nav className="fixed w-[94%] left-[3%] top-6 z-50 glass px-8 py-4 flex justify-between items-center border-white/10">
        <div className="flex items-center gap-2">
          <motion.img whileHover={{ rotate: 180 }} src="https://img.icons8.com/color/48/lotus.png" className="w-8 h-8" alt="logo" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">TN Flow</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {features.map((f, i) => (
            <Link key={i} to={f.path} className="text-xs font-black uppercase tracking-widest text-white/70 hover:text-cyan-400 transition-colors">
              {f.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} className="text-white/70 hover:text-cyan-400 transition-colors cursor-pointer">
            <Globe size={22}/>
          </button>
          <button onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full hover:bg-white/20 transition-all border border-white/20 cursor-pointer">
            <User size={20} className="text-cyan-400" /> 
            <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline">Profile</span>
          </button>
        </div>
      </nav>

      {/* 2. PROFILE SIDEBAR (Left Side) */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProfileOpen(false)} className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-md" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed left-0 top-0 h-full w-85 glass rounded-none border-y-0 border-l-0 z-[70] p-10 flex flex-col shadow-3xl">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-widest text-white">Identity</h2>
                <button onClick={() => setIsProfileOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"><X size={28} /></button>
              </div>
              
              <div className="flex-1 space-y-8">
                <div className="text-center mb-10">
                  <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white/20 mb-4">
                    <User size={48} />
                  </div>
                  <h3 className="text-xl font-bold uppercase italic tracking-tighter">Traveler User</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="auth-label">Username</label>
                    <div className="auth-input-pill flex items-center">Arul M</div>
                  </div>
                  <div>
                    <label className="auth-label">Email Access</label>
                    <div className="auth-input-pill flex items-center">user.tnflow@example.com</div>
                  </div>
                  <div>
                    <label className="auth-label">Contact Link</label>
                    <div className="auth-input-pill flex items-center">+91 98765 43210</div>
                  </div>
                </div>
              </div>

              <button onClick={() => signOut(auth).then(() => navigate("/"))} className="btn-pill bg-gradient-to-r from-red-500 to-pink-600 border-none">
                <LogOut size={20} className="mr-2"/> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. HERO SECTION (3D FEATURE BLOCK) */}
      <main className="pt-48 flex items-center justify-center px-6 perspective-[1500px]">
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="max-w-5xl w-full glass p-0 flex flex-col md:flex-row overflow-hidden border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
        >
          {/* Left Block: Visual Icon */}
          <div className="md:w-1/2 p-16 flex flex-col items-center justify-center bg-white/5 border-r border-white/5" style={{ transform: "translateZ(60px)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.3, opacity: 0 }} transition={{ duration: 0.6 }} className="text-center">
                <div className="mb-8 p-10 rounded-[2.5rem] bg-white/10 text-cyan-400 inline-block shadow-inner border border-white/10">
                  {features[activeIndex].icon}
                </div>
                <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">{features[activeIndex].title}</h2>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-10 flex gap-3">
              {features.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-cyan-400' : 'w-3 bg-white/20'}`} />
              ))}
            </div>
          </div>

          {/* Right Block: Typing Description */}
          <div className="md:w-1/2 p-16 flex flex-col justify-center bg-white/5" style={{ transform: "translateZ(30px)" }}>
            <div className="auth-label text-cyan-400 mb-2">TN Flow System</div>
            <div className="min-h-[160px] mb-10">
               <h3 className="text-3xl font-bold mb-4 text-white uppercase tracking-tight italic">{features[activeIndex].title}</h3>
               <p className="text-xl font-light leading-relaxed">
                  <Typewriter key={activeIndex} text={features[activeIndex].desc} />
               </p>
            </div>
            <motion.button onClick={() => navigate(features[activeIndex].path)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-pill">
              Explore Now
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;