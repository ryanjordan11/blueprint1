import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI } from '../../utils/openaiApi';

const ProfileOptimizer = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [bio, setBio] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const schema = {
        type: "OBJECT",
        properties: { optimizedBio: { type: "STRING" }, improvements: { type: "ARRAY", items: { type: "STRING" } }, headline: { type: "STRING" } }
      };
      const result = await callOpenAI(`Current Bio: ${bio}`, "Optimize this bio for conversions. Provide headline + optimized version + 4 improvements.", schema);
      setOutput(result.json);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a17] p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-[#9b978e] hover:text-[#1c1a17] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#1a9e6e' }}>05</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">Profile Optimizer</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">Social Proof · Authority · Clarity</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)]">
            <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold block mb-2">Current Bio / About</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="4" placeholder="Your current bio..." className="w-full p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none resize-none" />
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#1a9e6e] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Optimizing...' : 'Optimize Conversions'}
            </button>
          </div>
        </div>

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-3">New Headline</p>
              <div onClick={() => copy(output.headline)} className="p-4 bg-[#f0ede8] rounded-xl font-serif cursor-pointer">{output.headline}</div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-3">Optimized Bio</p>
              <div onClick={() => copy(output.optimizedBio)} className="p-4 bg-[#f0ede8] rounded-xl cursor-pointer">{output.optimizedBio}</div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-3">Actionable Improvements</p>
              <div className="space-y-2">
                {output.improvements?.map((im, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-white border border-[rgba(28,26,23,0.1)] rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#1a9e6e] text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                    <p className="font-serif text-sm">{im}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileOptimizer;