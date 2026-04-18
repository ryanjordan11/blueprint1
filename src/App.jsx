import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Zap, Target, Flame, Layout, Send, BookOpen, UserCheck, Play, Download, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [view, setView] = useState('landing'); // 'landing' or 'success'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLandingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation of the viral system processing
    setTimeout(() => {
      setLoading(false);
      setView('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-yellow-400 overflow-x-hidden">
      {/* High-Urgency Sticky Header */}
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-black text-white py-3 px-4 text-center text-[10px] md:text-xs font-black tracking-[0.2em] uppercase border-b-4 border-yellow-400 sticky top-0 z-50"
      >
        Attention: The Manual Content Era is Over. Stop Chasing Vanity Metrics.
      </motion.div>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          /* ==========================================
             PAGE 1: THE HIGH-CONVERSION LANDING PAGE
             ========================================== */
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {/* Hero Section */}
            <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-24 pb-12 text-center md:text-left grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-8">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-yellow-400 text-black px-4 py-1 font-black text-xs md:text-sm uppercase mb-6 transform -rotate-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  FREE ACCESS: VIRAL MARKETING BLUEPRINT
                </motion.div>
                
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">
                  Turn Facebook Into A <br />
                  <span className="text-red-600 italic underline decoration-black underline-offset-8">Money Machine</span>.
                </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mb-10 leading-snug italic border-l-8 border-slate-200 pl-6"
                >
                  "100M views and $0 in sales isn’t a win, it’s a warning. Stop chasing vanity metrics and start building intent. Attention is a commodity; conversion is the only currency that matters."
                </motion.p>

                {/* Lead Capture Form */}
                <motion.div 
                  className="max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <form onSubmit={handleLandingSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your best email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-100 border-4 border-slate-200 py-4 px-6 focus:outline-none focus:border-black transition-all text-lg font-bold"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black hover:bg-red-600 text-white font-black px-8 py-4 transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                    >
                      {loading ? "WIRING SYSTEM..." : "GET THE BLUEPRINT"}
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                  <p className="mt-4 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    "Stop pumping out new posts. Learn how the algorithm actually works."
                  </p>
                </motion.div>
              </div>

              {/* Visual Asset Side */}
              <motion.div 
                className="hidden md:block md:col-span-4"
                initial={{ opacity: 0, rotate: 10, x: 50 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <div className="relative group">
                  <motion.div 
                    animate={{ x: [4, 8, 4], y: [4, 0, 4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-yellow-400 translate-x-4 translate-y-4 -z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" 
                  />
                  <div className="bg-black text-white p-8 aspect-[3/4] flex flex-col justify-between border-4 border-black relative z-10">
                    <BookOpen className="w-12 h-12 text-yellow-400" />
                    <div>
                      <div className="text-4xl font-black leading-none mb-2 underline decoration-yellow-400 uppercase tracking-tighter">Viral</div>
                      <div className="text-4xl font-black leading-none mb-4 uppercase tracking-tighter">Blueprint</div>
                      <div className="text-[10px] font-black bg-white text-black px-2 py-1 inline-block uppercase tracking-widest">Master System V.2</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </header>

            {/* Pain Points Section */}
            <section className="bg-slate-50 py-24 border-y-4 border-slate-200">
              <div className="max-w-4xl mx-auto px-6">
                <motion.h2 {...fadeInUp} className="text-4xl font-black mb-16 uppercase text-center tracking-tighter">
                  The Brutal Truth
                </motion.h2>
                <motion.div 
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-12"
                >
                  {[
                    "You're spending hours creating content, only to get no traction and no sales.",
                    "You're stuck in reaction mode—posting randomly, hoping something sticks.",
                    "You don't have a content problem... you have a SYSTEM problem.",
                    "The spreadsheet era is over. The manual content era is over."
                  ].map((text, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex gap-4 group">
                      <div className={`w-12 h-12 shrink-0 flex items-center justify-center font-black italic text-xl ${i === 3 ? 'bg-black' : 'bg-red-600'} text-white border-2 border-black transition-transform group-hover:rotate-12`}>
                        {i === 3 ? '0' : '!'}
                      </div>
                      <p className="text-lg font-bold leading-tight">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* ==========================================
             PAGE 2: THE SUCCESS PAGE WITH VIDEO PLAYER
             ========================================== */
          <motion.div
            key="success"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="max-w-5xl mx-auto px-6 pt-12 pb-24"
          >
            <div className="text-center mb-16">
              <motion.div 
                initial={{ scale: 0, rotate: -45 }} 
                animate={{ scale: 1, rotate: 0 }}
                className="w-20 h-20 bg-green-500 border-4 border-black flex items-center justify-center mx-auto mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <CheckCircle className="text-white w-12 h-12" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Access Granted.</h1>
              <p className="text-xl text-slate-500 font-medium italic">
                The blueprint has been sent to <span className="text-black font-bold underline decoration-yellow-400">{email}</span>. Start with the guide below.
              </p>
            </div>

            {/* VIDEO PLAYER PLACEHOLDER */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group mb-16"
            >
              <div className="absolute inset-0 bg-red-600 translate-x-4 translate-y-4 -z-10" />
              <div className="aspect-video bg-black border-4 border-black relative overflow-hidden flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black" />
                
                {/* Play Button Overlay */}
                <div className="relative z-10 text-center px-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-lg cursor-pointer"
                  >
                    <Play className="w-12 h-12 text-black fill-current translate-x-1" />
                  </motion.div>
                  <h2 className="text-white font-black text-2xl md:text-5xl uppercase tracking-tighter leading-none mb-2">
                    WATCH THE <span className="text-yellow-400 italic">IMPLEMENTATION</span> GUIDE
                  </h2>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                    Installing the 5-step machine in 48 hours.
                  </p>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 border-t-2 border-white/10 flex items-center gap-4">
                  <div className="h-1.5 bg-white/20 flex-grow rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "42%" }}
                      transition={{ duration: 3, delay: 1 }}
                      className="h-full bg-red-600"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/70">02:18 / 05:45</span>
                </div>
              </div>
            </motion.div>

            {/* Assets Downloads List */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Viral Blueprint", meta: "42-Page Strategy", icon: BookOpen },
                { title: "The Slide Deck", meta: "Visual Presentation", icon: Layout },
                { title: "The Hook Vault", meta: "99+ Top Templates", icon: Zap }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, borderColor: '#000' }}
                  className="bg-white border-4 border-slate-100 p-6 flex items-center gap-4 transition-all group cursor-pointer"
                >
                  <div className="bg-black text-yellow-400 p-3 group-hover:rotate-12 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-black uppercase text-[11px] tracking-tight leading-none mb-1">{item.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{item.meta}</p>
                  </div>
                  <Download className="w-5 h-5 text-slate-300 group-hover:text-red-600" />
                </motion.div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <button 
                onClick={() => setView('landing')}
                className="text-slate-400 hover:text-black font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to main site
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] border-t-4 border-slate-50">
        &copy; {new Date().getFullYear()} Viral Marketing Blueprint // Conversion is the Only Currency
      </footer>
    </div>
  );
};

export default App;