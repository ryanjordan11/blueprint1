import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { callOpenAI, generateImage, performImageToImage } from '../../utils/openaiApi';

const ImageGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [topic, setTopic] = useState('');
  const [setting, setSetting] = useState('Modern Studio');
  const [error, setError] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoBase64(ev.target.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOutput(null);
    setError('');
    try {
      const schema = {
        type: "OBJECT",
        properties: { imagePrompt: { type: "STRING" }, headlines: { type: "ARRAY", items: { type: "STRING" } }, visualStrategy: { type: "STRING" } }
      };
      const systemPrompt = `Viral social media image strategist for "Breaking News" style. Subject: surprised/shocked expression. Include "BREAKING" badge. Bold white text overlay. Neon lime green highlights. High contrast cinematic lighting. ${setting} background. 1:1 square ratio.`;
      const result = await callOpenAI(`Topic: ${topic}, Setting: ${setting}`, systemPrompt, schema);
      const data = result.json;
      let imageUrl = photoBase64 ? await performImageToImage(data.imagePrompt, photoBase64) : await generateImage(data.imagePrompt);
      setOutput({ ...data, imageUrl });
    } catch (e) {
      console.error(e);
      setError(e?.message || 'Image generation failed.');
    }
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
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#c2410c' }}>06</div>
          <div>
            <h1 className="text-2xl font-bold font-serif">Viral Visual Generator</h1>
            <p className="text-xs text-[#9b978e] uppercase tracking-wider">Breaking Style · Personal Photo Support · Neon Impact</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div className="p-6 border-b border-[rgba(28,26,23,0.1)] space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Main Viral Topic</label>
                <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI is replacing developers" className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold">Visual Setting</label>
                <select value={setting} onChange={(e) => setSetting(e.target.value)} className="p-3 border-2 border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] focus:border-[#1c1a17] outline-none">
                  <option>Modern Studio</option><option>Tropical Oasis</option><option>Epic Mountains</option><option>High-Tech Lab</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-[#9b978e] font-bold block mb-2">Your Photo (Optional)</label>
              <div className="relative h-24 border-2 border-dashed border-[rgba(28,26,23,0.18)] rounded-xl bg-[#f0ede8] flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#1c1a17]">
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <span className="text-xs text-[#9b978e]">{photoBase64 ? 'Photo uploaded ✓' : 'Click to upload'}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-[#f0ede8]">
            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 bg-[#c2410c] text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50">
              {loading ? 'Generating...' : 'Generate Viral Template'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {output && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[rgba(28,26,23,0.1)] p-6">
            <div className="p-4 bg-[#f0ede8] rounded-xl mb-6">
              <p className="font-bold mb-2">Visual Strategy:</p>
              <p className="text-sm">{output.visualStrategy}</p>
              <p className="font-bold mt-4 mb-2">Headline Variants:</p>
              <ul className="text-sm list-disc pl-5">{output.headlines?.map((h, i) => <li key={i}>{h}</li>)}</ul>
            </div>
            {output.imageUrl && <img src={output.imageUrl} alt="Generated" className="w-full max-w-md mx-auto rounded-xl border-4 border-[#1c1a17] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] mb-4" />}
            <div onClick={() => copy(output.imagePrompt)} className="p-4 bg-[#111] text-[#00ffaa] font-mono text-xs rounded-lg cursor-pointer">{output.imagePrompt}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
