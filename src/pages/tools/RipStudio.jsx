import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Copy, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateImage } from '../../utils/openaiApi';

const templates = [
  { id: 1, name: 'RIP ChatGPT', target: 'ChatGPT', industry: 'AI' },
  { id: 2, name: 'RIP Google', target: 'Google', industry: 'Search' },
  { id: 3, name: 'RIP Canva', target: 'Canva', industry: 'Design' },
  { id: 4, name: 'RIP Claude', target: 'Claude', industry: 'AI' },
];

const RipStudio = () => {
  const [loading, setLoading] = useState(null);
  const [generated, setGenerated] = useState({});
  const [error, setError] = useState('');

  const generatePrompt = (targetName, ind) => {
    const industryMap = {
      'AI': 'tech CEO or professional in modern office setting with AI technology elements and chatbots',
      'Search': 'tech professional with search engine UI elements and Google-like interface',
      'Video': 'video creator with video editing software interfaces and creative tools around them',
      'Design': 'designer with creative software tools like Canva, design elements and colorful workspace',
      'Social': 'social media influencer with smartphone, social media apps and trendy setting',
      'Ads': 'marketing professional with ad dashboard showing Facebook ads and analytics screens',
      'Automation': 'tech professional with automation workflow diagrams, Zapier integrations and connected apps',
      'Productivity': 'business professional with productivity apps like Excel, Notion and organized workspace',
      'Tech': 'tech professional in modern office with technology elements',
    };
    
    const industryDesc = industryMap[ind] || industryMap['Tech'];
    
    return `Viral Facebook meme image, square format 1:1. A ${industryDesc} stands emotionally devastated, crying, with hands on their face beside a dark gray gravestone that reads "R.I.P. ${targetName}" in carved letters. Dramatic shallow depth of field. High contrast cinematic lighting with dramatic shadows. Background is slightly blurred dark atmosphere. Include subtle ${targetName} brand logo near the gravestone. "BREAKING" red banner in top right corner. Big bold white headline text "RIP ${targetName}" positioned below center. Below that, electric neon green subheadline in bold caps: "THE END OF ${targetName.toUpperCase()} AS WE KNOW IT". Hyper-realistic photo style, not cartoon. Mobile-optimized. Viral stop-scrolling impact. High emotional reaction - sad, crying, devastated expression. Dramatic lighting from above. Clean composition, no clutter. Dark moody cemetery atmosphere.`;
  };

  const handleGenerate = async (template) => {
    setLoading(template.id);
    setError('');
    
    try {
      const prompt = generatePrompt(template.target, template.industry);
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
      <div className="max-w-4xl mx-auto">
        <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">RIP Studio</h1>
            <p className="text-xs text-zinc-500">Viral Gravestone Generator</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="flex flex-col gap-3">
              <div className="aspect-square bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden">
                {loading === template.id ? (
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                ) : generated[template.id] ? (
                  <img src={generated[template.id]} alt={template.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-zinc-600 text-xs text-center p-2">{template.name}</div>
                )}
              </div>
              <button
                onClick={() => handleGenerate(template)}
                disabled={loading === template.id}
                className="py-2 bg-red-600 text-white text-sm font-bold uppercase rounded-lg hover:bg-red-500 disabled:opacity-50 transition-colors"
              >
                {loading === template.id ? 'Generating...' : 'Generate'}
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex gap-2 flex-wrap">
            <button
              onClick={() => navigator.clipboard.writeText(Object.values(generated).find(url => url) || '')}
              className="px-4 py-2 bg-zinc-700 text-white text-sm rounded-lg flex items-center gap-2"
            >
              <Copy className="w-4 h-4" /> Copy URL
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RipStudio;
