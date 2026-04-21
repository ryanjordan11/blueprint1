import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Zap, Layout, Send, BookOpen, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIInfluencerLanding = () => {
  const [view, setView] = useState('landing');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const handleLandingSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 overflow-x-hidden">
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-yellow-400 text-black py-3 px-4 text-center text-[10px] md:text-xs font-black tracking-[0.2em] uppercase border-b-4 border-black sticky top-0 z-50"
      >
        AI Influencer System // Get In Before Everyone Catches On
      </motion.div>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {/* HERO */}
            <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-12 text-center grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-yellow-400 text-black px-4 py-1 font-black text-xs md:text-sm uppercase mb-6 transform -rotate-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  FREE ACCESS // BECOME AN AI INFLUENCER
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">
                  Become An <span className="text-yellow-400 italic">AI Influencer</span> Overnight.
                </h1>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mb-10 leading-snug"
                >
                  Stop creating content manually. Start operating a machine that generates viral posts, images, and engagement while you sleep.
                </motion.p>

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
                      placeholder="Enter your email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border-4 border-slate-700 py-4 px-6 focus:outline-none focus:border-yellow-400 transition-all text-lg font-bold text-white"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-400 hover:bg-white text-black font-black px-8 py-4 transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider border-4 border-yellow-400"
                    >
                      {loading ? "WIRING SYSTEM..." : "START THE AI ENGINE"}
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                  <p className="mt-4 text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                    Get in before everyone catches on.
                  </p>
                </motion.div>
              </div>

              {/* Hero Image */}
              <motion.div
                className="hidden md:block md:col-span-5"
                initial={{ opacity: 0, rotate: -5, x: 50 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <div className="relative group">
                  <motion.div
                    animate={{ x: [6, 10, 6], y: [6, 0, 6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-yellow-400 translate-x-3 translate-y-3 -z-10 shadow-[8px_8px_0px_0px_rgba(250,204,21,0.5)]"
                  />
                  <img 
                    src="/fab616ad-214c-47e3-85ee-99cc8ccb8768.png" 
                    alt="AI Influencer" 
                    className="w-full border-4 border-yellow-400 shadow-2xl"
                  />
                </div>
              </motion.div>
            </header>

            {/* SECTION 1 */}
            <section className="bg-slate-900 py-20 border-y-4 border-slate-800">
              <div className="max-w-4xl mx-auto px-6">
                <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter text-center">
                  <span className="text-red-500">Right now,</span> people are blowing up on Facebook using AI.
                </motion.h2>
                <motion.p {...fadeInUp} className="text-xl text-slate-300 text-center max-w-2xl mx-auto leading-relaxed">
                  Not because they're smarter.<br/>
                  Not because they're more creative.<br/><br/>
                  <span className="text-yellow-400 font-black text-2xl">Because they're faster!</span><br/><br/>
                  They're using systems that generate content for them every single day.<br/><br/>
                  <span className="text-red-500 font-bold">While most people are stuck thinking…</span><br/>
                  <span className="text-2xl font-black">"What do I post?"</span>
                </motion.p>
              </div>
            </section>

            {/* SECTION 2 */}
            <section className="bg-black py-20 border-b-4 border-slate-800">
              <div className="max-w-4xl mx-auto px-6">
                <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tighter text-center">
                  You're trying to:
                </motion.h2>
                <motion.div 
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
                >
                  {[
                    "Come up with ideas",
                    "Create content manually",
                    "Stay consistent",
                    "Figure out what works"
                  ].map((text, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-center gap-4 bg-slate-900 p-6 border-2 border-slate-700">
                      <div className="w-10 h-10 bg-red-600 text-white font-black flex items-center justify-center border-2 border-white shrink-0">
                        ✕
                      </div>
                      <p className="text-lg font-bold text-slate-300">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.p {...fadeInUp} className="text-center mt-12 text-xl text-slate-400">
                  And getting buried doing it.<br/><br/>
                  Meanwhile…<br/>
                  <span className="text-yellow-400 font-black text-2xl">AI influencers are posting nonstop and taking attention daily.</span>
                </motion.p>
              </div>
            </section>

            {/* SECTION 3 */}
            <section className="bg-yellow-400 text-black py-24">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h2 {...fadeInUp} className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter">
                  So I built the system.
                </motion.h2>
                <motion.p {...fadeInUp} className="text-3xl md:text-5xl font-black uppercase">
                  It turns you into an <span className="text-red-600">AI influencer</span>.
                </motion.p>
              </div>
            </section>

            {/* SECTION 4 */}
            <section className="bg-black py-20 border-b-4 border-slate-800">
              <div className="max-w-4xl mx-auto px-6">
                <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tighter text-center">
                  The system <span className="text-yellow-400">does this</span>:
                </motion.h2>
                <motion.div 
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    "Generates viral posts",
                    "Creates scroll-stopping images",
                    "Builds comment ladders",
                    "Follows trends automatically"
                  ].map((text, i) => (
                    <motion.div key={i} variants={fadeInUp} className="flex items-center gap-4 bg-slate-900 p-6 border-2 border-yellow-400">
                      <div className="w-10 h-10 bg-yellow-400 text-black font-black flex items-center justify-center border-2 border-black shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-xl font-bold">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.p {...fadeInUp} className="text-center mt-8 text-lg text-slate-400">
                  <span className="text-white font-black">You don't need ideas.</span><br/>
                  <span className="text-white font-black">You don't need to think.</span><br/><br/>
                  You run the system.
                </motion.p>
              </div>
            </section>

            {/* SECTION 5 */}
            <section className="bg-slate-900 py-20 border-b-4 border-slate-800">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                  You don't create <span className="text-red-500">content</span> anymore.
                </motion.h2>
                <motion.p {...fadeInUp} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4">
                  You operate a <span className="text-yellow-400">machine</span> that does.
                </motion.p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-yellow-400 text-black py-20">
              <div className="max-w-2xl mx-auto px-6 text-center">
                <motion.button
                  onClick={handleLandingSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-yellow-400 font-black px-12 py-6 text-2xl uppercase tracking-wider border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Start the AI Engine
                </motion.button>
                <p className="mt-6 text-lg font-bold uppercase tracking-wider">
                  Get in before everyone catches on.
                </p>
              </div>
            </section>

            {/* FINAL PUSH */}
            <section className="bg-black py-16 border-t-4 border-slate-800">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-slate-400 text-lg mb-4">
                  The people using AI are winning.
                </p>
                <p className="text-red-500 font-black text-xl uppercase tracking-wider">
                  The ones waiting… get left behind.
                </p>
              </div>
            </section>
          </motion.div>
        ) : (
          /* SUCCESS PAGE */
          <motion.div
            key="success"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="max-w-5xl mx-auto px-6 pt-12 pb-24"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter flex items-center justify-center gap-4">
                <span className="text-yellow-400">✓</span> Access Granted
              </h1>
              <p className="text-xl text-slate-400 font-medium">
                The AI Engine has been activated for <span className="text-yellow-400 font-bold">{email}</span>
              </p>
            </div>

            {/* Video */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative group mb-16"
            >
              <div className="absolute inset-0 bg-red-600 translate-x-4 translate-y-4 -z-10" />
              <div className="aspect-video bg-black border-4 border-black relative overflow-hidden flex items-center justify-center shadow-2xl">
                {!videoStarted ? (
                  <>
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black" />
                    <div className="relative z-10 text-center px-6">
                      <motion.button
                        onClick={() => setVideoStarted(true)}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-lg cursor-pointer"
                      >
                        <Play className="w-12 h-12 text-black fill-current translate-x-1" />
                      </motion.button>
                      <h2 className="text-white font-black text-2xl md:text-5xl uppercase tracking-tighter leading-none mb-2">
                        Watch The <span className="text-yellow-400 italic">System</span>
                      </h2>
                    </div>
                  </>
                ) : (
                  <video className="w-full h-full object-contain" controls autoPlay>
                    <source src="/Strategic_Marketing_Blueprint.mp4" type="video/mp4" />
                  </video>
                )}
              </div>
            </motion.div>

            {/* Assets */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border-4 border-slate-700 p-6">
                <div className="bg-yellow-400 text-black p-3 w-fit mb-4">
                  <Layout className="w-6 h-6" />
                </div>
                <h4 className="font-black uppercase text-sm mb-2">The Blueprints</h4>
                <p className="text-slate-400 text-xs uppercase">3 Deep Dives</p>
              </div>
              <div className="bg-slate-900 border-4 border-slate-700 p-6">
                <div className="bg-yellow-400 text-black p-3 w-fit mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-black uppercase text-sm mb-2">AI Hook Generator</h4>
                <p className="text-slate-400 text-xs uppercase">25 Hooks Per Click</p>
              </div>
              <div className="bg-slate-900 border-4 border-slate-700 p-6">
                <div className="bg-yellow-400 text-black p-3 w-fit mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-black uppercase text-sm mb-2">Full System Access</h4>
                <p className="text-slate-400 text-xs uppercase">Everything You Need</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button className="bg-yellow-400 text-black font-black px-8 py-4 text-lg uppercase tracking-wider border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                Get Full Access - $27
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] border-t-4 border-slate-800">
        &copy; {new Date().getFullYear()} AI Influencer System
      </footer>
    </div>
  );
};

export default AIInfluencerLanding;