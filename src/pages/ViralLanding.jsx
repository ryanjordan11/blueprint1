import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ViralLanding = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Thanks! Check your email.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full text-center"
        >
          <img 
            src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png" 
            alt="AI Influencer"
            className="w-full max-w-2xl mx-auto mb-12 border-4 border-white"
          />
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Become An <span className="italic">AI Influencer</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            Stop creating content manually. Start operating a machine that generates viral posts while you sleep.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white/10 border-2 border-white/30 py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-white"
            />
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black font-black px-8 py-4 uppercase tracking-wider"
            >
              {loading ? "..." : "Start"}
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Blank section below */}
      <section className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600 text-sm uppercase tracking-widest">More coming soon</p>
      </section>
    </div>
  );
};

export default ViralLanding;