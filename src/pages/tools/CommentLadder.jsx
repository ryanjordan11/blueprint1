import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI } from '../../utils/openaiApi';

const CommentLadder = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [win, setWin] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const schema = {
        type: "OBJECT",
        properties: { steps: { type: "ARRAY", items: { type: "OBJECT", properties: { role: { type: "STRING" }, text: { type: "STRING" } } } } }
      };
      const result = await callOpenAI(`Post focus: ${win}`, "5-step comment ladder: 1) Broad question, 2) Value hint, 3) Curiosity loop, 4) Controversy, 5) High-friction CTA.", schema);
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
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#7b5ea7' }}>03</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">Comment Ladder Builder</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">Engagement Velocity Framework</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)]">
            <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold block mb-2">The Main "Win" of your post</label>
            <input value={win} onChange={(e) => setWin(e.target.value)} placeholder="e.g. shared my 5-step productivity morning" className="w-full p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#7b5ea7] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Building...' : 'Build Interaction Sequence'}
            </button>
          </div>
        </div>

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6">
            {output.steps?.map((s, i) => (
              <div key={i} onClick={() => copy(s.text)} className="flex gap-4 py-4 border-b border-[rgba(28,26,23,0.1)] last:border-0 cursor-pointer hover:bg-[#f0ede8]">
                <div className="w-8 h-8 rounded-lg bg-[#1c1a17] text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[#9b978e] font-bold mb-1">{s.role}</p>
                  <p className="font-serif">{s.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CommentLadder;