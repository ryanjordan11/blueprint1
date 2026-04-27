import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI } from '../../utils/openaiApi';

const ContentCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [form, setForm] = useState({
    niche: '',
    audience: '',
    postsPerWeek: '7'
  });

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const schema = {
        type: "OBJECT",
        properties: {
          calendar: { type: "ARRAY", items: { type: "OBJECT", properties: { day: { type: "STRING" }, type: { type: "STRING" }, hook: { type: "STRING" }, post: { type: "STRING" }, cta: { type: "STRING" } } } },
          weeklyThemes: { type: "ARRAY", items: { type: "STRING" } }
        }
      };
      const result = await callOpenAI(
        `Niche: ${form.niche}, Audience: ${form.audience}, Posts per week: ${form.postsPerWeek}`,
        "Build a 30-day content calendar with day, post type, hook, full post, and CTA. Include weekly themes.",
        schema
      );
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
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#8b5cf6' }}>08</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">Content Calendar Builder</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">30-Day Posting Strategy</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)]">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Your Niche</label>
                <input value={form.niche} onChange={(e) => setForm({...form, niche: e.target.value})} placeholder="e.g. Productivity, Fitness, Tech" className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Target Audience</label>
                <input value={form.audience} onChange={(e) => setForm({...form, audience: e.target.value})} placeholder="e.g. Busy Professionals" className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Posts Per Week</label>
              <select value={form.postsPerWeek} onChange={(e) => setForm({...form, postsPerWeek: e.target.value})} className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none">
                <option value="3">3 posts/week</option><option value="5">5 posts/week</option><option value="7">Daily</option>
              </select>
            </div>
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#8b5cf6] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Building...' : 'Build 30-Day Calendar'}
            </button>
          </div>
        </div>

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {output.weeklyThemes && (
              <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6 mb-6">
                <p className="text-xs uppercase tracking-wider text-[#9b978e] font-bold mb-3">Weekly Themes</p>
                <div className="flex flex-wrap gap-2">
                  {output.weeklyThemes.map((theme, i) => (
                    <span key={i} className="px-3 py-1 bg-[#8b5cf6] text-white text-xs rounded-full">{theme}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] divide-y divide-[rgba(28,26,23,0.1)]">
              {output.calendar?.map((item, i) => (
                <div key={i} className="p-4 hover:bg-[#f0ede8]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-sm">{item.day}</span>
                    <span className="px-2 py-1 bg-[#f0ede8] text-xs rounded">{item.type}</span>
                  </div>
                  <p onClick={() => copy(item.hook)} className="font-serif text-[#e8542a] cursor-pointer text-sm mb-2">Hook: {item.hook}</p>
                  <p onClick={() => copy(item.post)} className="font-serif text-sm mb-2">{item.post}</p>
                  <p onClick={() => copy(item.cta)} className="text-xs italic text-[#9b978e]">CTA: {item.cta}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContentCalendar;