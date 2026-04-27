import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateImage } from '../../utils/openaiApi';

const templates = [
  { id: 1, name: 'RIP', target: 'ChatGPT', industry: 'AI', image: '/image_templates/rip_1.png', desc: 'Gravestone style' },
  { id: 2, name: 'Breaking', target: 'Google', industry: 'Search', image: '/image_templates/breaking_1.png', desc: 'BREAKING banner' },
  { id: 3, name: '99% of you', target: ' freelancers', industry: 'Disruption', image: null, desc: 'Failure rate theme' },
  { id: 4, name: 'These prompts', target: 'cold DMs', industry: 'Sales', image: null, desc: 'Prompts theme' },
  { id: 5, name: 'RIP 2', target: 'Claude', industry: 'AI', image: '/image_templates/rip_1.png', desc: 'RIP variant' },
  { id: 6, name: 'Breaking 2', target: 'Instagram', industry: 'Social', image: '/image_templates/breaking_1.png', desc: 'Breaking variant' },
];

const Studio = () => {
  const [loading, setLoading] = useState(null);
  const [generated, setGenerated] = useState({});
  const [error, setError] = useState('');

  const buildPrompt = (template) => {
    return `Viral Facebook meme image. Square format 1:1. Hyper-real cinematic style. Strong emotion (sadness, crying, disbelief). High contrast lighting. Extremely clear on mobile. Centered subject. No clutter. Viral Facebook meme style.

SCENE: A CEO matching the industry of ${template.target} reacts emotionally upset beside a dark gravestone. Gravestone text MUST say: "R.I.P. ${template.target}". Include subtle visual cues of the industry (UI elements, tools, icons, screens).

LOGO RULE: Include the official recognizable logo of ${template.target} near the headline or gravestone. Do NOT distort or over-enlarge the logo.

TEXT ON IMAGE: Big bold white headline below center: "RIP ${template.target}". Sub headline white with neon green, 3-6 words max, disruptive. Add a red "BREAKING" banner (top right). Highlight 1-2 key words subheadline in neon green. Text must be LARGE and readable on mobile.

VISUAL STYLE: Dramatic lighting. Shallow depth of field. Cinematic realism (NOT cartoon). Clean composition. Strong contrast between subject and background.

GOAL: High-performing viral Facebook marketing image that stops scrolling instantly.`;
  };

  const handleGenerate = async (template) => {
    setLoading(template.id);
    setError('');
    
    try {
      const prompt = buildPrompt(template);
      const url = await generateImage(prompt);
      setGenerated(prev => ({ ...prev, [template.id]: url }));
    } catch (err) {
      console.error('Generation error:', err);
      setError(err?.message || 'Image generation failed.');
    }
    
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Studio</h1>
            <p className="text-xs text-zinc-500">Select a template and generate</p>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="flex flex-col gap-3">
              <div className="aspect-square bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden border-2 border-zinc-700 p-1">
                {template.image ? (
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-1">
                    <div className="text-sm font-bold text-red-500 uppercase">{template.name}</div>
                    <div className="text-[8px] text-zinc-500">{template.desc}</div>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleGenerate(template)}
                disabled={loading === template.id}
                className="py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg hover:bg-red-500 disabled:opacity-50 transition-colors"
              >
                {loading === template.id ? '...' : 'Generate'}
              </button>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {Object.values(generated).some(url => url) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
            <h2 className="text-lg font-bold mb-4">Generated</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {templates.map((template) => (
                generated[template.id] && (
                  <div key={template.id}>
                    <img 
                      src={generated[template.id]} 
                      alt={template.name} 
                      className="w-full aspect-square object-cover rounded-xl border-2 border-zinc-700 mb-2" 
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(generated[template.id])}
                      className="w-full py-2 bg-zinc-700 text-white text-xs rounded-lg flex items-center justify-center gap-1 hover:bg-zinc-600"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Studio;
