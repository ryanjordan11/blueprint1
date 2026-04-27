import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI } from '../../utils/openaiApi';

const ViralRewriter = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const schema = {
        type: "OBJECT",
        properties: { variants: { type: "ARRAY", items: { type: "OBJECT", properties: { tone: { type: "STRING" }, content: { type: "STRING" } } } } }
      };
      const result = await callOpenAI(`Draft: ${input}`, "Rewrite into 3 variants: punchy/minimalist, value-heavy, controversial/edgy.", schema);
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
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#2a7dd4' }}>04</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">Viral Rewrite Engine</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">Tone · Clarity · Tension · Hook</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)]">
            <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold block mb-2">Original Draft</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} rows="5" placeholder="Paste your boring post here..." className="w-full p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none resize-none" />
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#2a7dd4] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Upgrading...' : 'Upgrade for Virality'}
            </button>
          </div>
        </div>

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {output.variants?.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6">
                <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-3">{v.tone} Variant</p>
                <div onClick={() => copy(v.content)} className="p-4 bg-[#f0ede8] rounded-xl font-serif whitespace-pre-wrap cursor-pointer">{v.content}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViralRewriter;