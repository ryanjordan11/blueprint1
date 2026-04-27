import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI } from '../../utils/openaiApi';

const TrendsRadar = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [query, setQuery] = useState('Latest AI Trends');

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const schema = {
        type: "OBJECT",
        properties: { trends: { type: "ARRAY", items: { type: "OBJECT", properties: { title: { type: "STRING" }, summary: { type: "STRING" }, whyTrending: { type: "STRING" } } } } }
      };
      const result = await callOpenAI(`Find top 3-5 latest news for: ${query}`, "You are an AI news analyst with real-time search.", schema, true);
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
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#0ea5e9' }}>07</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">AI News Trends Radar</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">Real-time Grounding · News Synthesis</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)]">
            <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold block mb-2">News Category / Keyword</label>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#0ea5e9] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Scanning...' : 'Scan AI Horizon'}
            </button>
          </div>
        </div>

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {output.trends?.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6 hover:border-[#0ea5e9] transition-colors">
                <h3 className="text-lg font-bold font-serif mb-2">{t.title}</h3>
                <p className="text-sm text-[#4a4741] mb-3">{t.summary}</p>
                <p className="text-xs italic text-[#9b978e] mb-4">Why it's trending: {t.whyTrending}</p>
                <div className="flex justify-between items-center">
                  <button onClick={() => copy(`${t.title}: ${t.summary}`)} className="px-4 py-2 bg-[#1c1a17] text-white text-xs rounded-full">Copy Summary</button>
                  
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrendsRadar;
