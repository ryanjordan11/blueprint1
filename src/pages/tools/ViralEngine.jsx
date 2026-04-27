import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI } from '../../utils/openaiApi';

const ViralEngine = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const [form, setForm] = useState({
    niche: 'Content Creation',
    audience: 'Ambitious Creators',
    goal: 'Grow followers',
    style: 'Mixed Styles'
  });

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const schema = {
        type: "OBJECT",
        properties: {
          hooks: { type: "ARRAY", items: { type: "STRING" } },
          posts: { type: "ARRAY", items: { type: "OBJECT", properties: { label: { type: "STRING" }, body: { type: "STRING" }, cta: { type: "STRING" } } } }
        }
      };
      const result = await callOpenAI(
        `Niche: ${form.niche}, Audience: ${form.audience}, Goal: ${form.goal}, Style: ${form.style}`,
        "You are an elite viral strategist. Generate 5 punchy hooks and 3 post templates.",
        schema
      );
      setOutput(result.json);
    } catch {
      alert('Generation failed. Check connection.');
    }
    setLoading(false);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a17] p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-[#9b978e] hover:text-[#1c1a17] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#e8542a' }}>01</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">Viral Content Engine</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">Role · Action · Context · Format</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)]">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Niche / Topic</label>
                <input value={form.niche} onChange={(e) => setForm({...form, niche: e.target.value})} className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Target Audience</label>
                <input value={form.audience} onChange={(e) => setForm({...form, audience: e.target.value})} className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Goal</label>
                <select value={form.goal} onChange={(e) => setForm({...form, goal: e.target.value})} className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none">
                  <option>Grow followers</option><option>Drive comments</option><option>Sell a product</option><option>Go viral</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Primary Angle</label>
                <select value={form.style} onChange={(e) => setForm({...form, style: e.target.value})} className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none">
                  <option>Mixed Styles</option><option>Hard Truths</option><option>Results/Proof</option><option>The "How-to" Secret</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#e8542a] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Generating...' : 'Generate Content Pack'}
            </button>
          </div>
        </div>

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6">
            <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-4">Viral Hooks (Click to copy)</p>
            <div className="grid gap-3 mb-8">
              {output.hooks?.map((h, i) => (
                <div key={i} onClick={() => copy(h)} className="p-4 bg-[#f0ede8] rounded-xl cursor-pointer hover:scale-[1.02] transition-transform font-serif">
                  {h}
                </div>
              ))}
            </div>

            <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-4">Content Templates</p>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {['Educational', 'Controversial', 'Direct Ask'].map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`px-4 py-2 rounded-full text-xs font-mono ${activeTab === i ? 'bg-[#1c1a17] text-white' : 'bg-white border border-[rgba(28,26,23,0.18)]'}`}>{t}</button>
              ))}
            </div>
            {output.posts?.[activeTab] && (
              <div>
                <div onClick={() => copy(output.posts[activeTab].body)} className="p-4 bg-[#f0ede8] rounded-xl mb-4 font-serif whitespace-pre-wrap cursor-pointer">
                  {output.posts[activeTab].body}
                </div>
                <div className="p-4 border-l-4 border-[#e8542a]">
                  <p className="text-[9px] uppercase text-[#9b978e] font-bold">Call to Action</p>
                  <p onClick={() => copy(output.posts[activeTab].cta)} className="font-serif italic cursor-pointer">{output.posts[activeTab].cta}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViralEngine;
