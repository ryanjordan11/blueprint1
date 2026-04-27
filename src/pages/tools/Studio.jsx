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

  const buildPrompt = () => {
    return `You are a viral Facebook image generator.

You MUST generate a COMPLETE image (not a prompt).

Square format. No explanations. Output image only.

---

TOPIC: [auto-generate]
TARGET: [auto-generate from known tools/brands]
AUDIENCE: [auto-generate]

Choose ONE randomly:
TOPIC/TARGET/AUDIENCE options:
TOPIC: AI automation / TARGET: ChatGPT / AUDIENCE: content creators

TOPIC: AI productivity / TARGET: Excel / AUDIENCE: business owners

TOPIC: AI video editing / TARGET: CapCut / AUDIENCE: short-form creators

TOPIC: AI search / TARGET: Google / AUDIENCE: everyday users

TOPIC: AI assistants / TARGET: Gemini / AUDIENCE: tech users

TOPIC: AI business tools / TARGET: Claude / AUDIENCE: entrepreneurs

TOPIC: AI design / TARGET: Canva / AUDIENCE: online marketers

TOPIC: AI video gen / TARGET: video editors / AUDIENCE: creators

TOPIC: AI coding / TARGET: developers / AUDIENCE: programmers

TOPIC: AI growth / TARGET: Instagram / AUDIENCE: influencers

TOPIC: AI funnels / TARGET: landing pages / AUDIENCE: marketers

TOPIC: AI outreach / TARGET: cold DMs / AUDIENCE: sales people

TOPIC: AI writing / TARGET: copywriters / AUDIENCE: freelancers

TOPIC: AI ads / TARGET: Facebook ads / AUDIENCE: advertisers

TOPIC: AI SEO / TARGET: Google rankings / AUDIENCE: bloggers

TOPIC: AI sales / TARGET: sales reps / AUDIENCE: closers

TOPIC: AI content / TARGET: posting manually / AUDIENCE: creators

TOPIC: AI branding / TARGET: personal brands / AUDIENCE: beginners

TOPIC: AI income / TARGET: 9–5 jobs / AUDIENCE: employees

TOPIC: AI business / TARGET: agencies / AUDIENCE: agency owners

TOPIC: AI tools / TARGET: Zapier / AUDIENCE: automation users

TOPIC: AI tools / TARGET: Notion / AUDIENCE: productivity users

TOPIC: AI tools / TARGET: Midjourney / AUDIENCE: designers

TOPIC: AI tools / TARGET: Photoshop / AUDIENCE: creatives

TOPIC: AI tools / TARGET: Illustrator / AUDIENCE: designers

TOPIC: AI tools / TARGET: Premiere Pro / AUDIENCE: video editors

TOPIC: AI tools / TARGET: Final Cut / AUDIENCE: editors

TOPIC: AI tools / TARGET: TikTok editing / AUDIENCE: creators

TOPIC: AI tools / TARGET: YouTube editing / AUDIENCE: YouTubers

TOPIC: AI tools / TARGET: blogging / AUDIENCE: writers

TOPIC: AI disruption / TARGET: freelancers / AUDIENCE: gig workers

TOPIC: AI disruption / TARGET: virtual assistants / AUDIENCE: VAs

TOPIC: AI disruption / TARGET: social media managers / AUDIENCE: marketers

TOPIC: AI disruption / TARGET: email marketing / AUDIENCE: business owners

TOPIC: AI disruption / TARGET: customer support / AUDIENCE: companies

TOPIC: AI disruption / TARGET: data entry / AUDIENCE: beginners

TOPIC: AI disruption / TARGET: research / AUDIENCE: students

TOPIC: AI disruption / TARGET: online courses / AUDIENCE: coaches

TOPIC: AI disruption / TARGET: consulting / AUDIENCE: consultants

TOPIC: AI disruption / TARGET: coaching / AUDIENCE: coaches

TOPIC: AI money / TARGET: side hustles / AUDIENCE: beginners

TOPIC: AI money / TARGET: dropshipping / AUDIENCE: ecom users

TOPIC: AI money / TARGET: affiliate marketing / AUDIENCE: affiliates

TOPIC: AI money / TARGET: lead gen / AUDIENCE: agencies

TOPIC: AI money / TARGET: SMMA / AUDIENCE: marketers

TOPIC: AI money / TARGET: course creators / AUDIENCE: educators

TOPIC: AI money / TARGET: digital products / AUDIENCE: creators

TOPIC: AI money / TARGET: manual outreach / AUDIENCE: sales

TOPIC: AI money / TARGET: cold calling / AUDIENCE: closers

TOPIC: AI money / TARGET: traditional marketing / AUDIENCE: businesses

Pick ONE and proceed.

---

IMAGE REQUIREMENTS:
- hyper-real cinematic style
- strong emotion (sadness, crying, disbelief)
- high contrast lighting
- extremely clear on mobile
- centered subject
- no clutter
- viral Facebook meme style

---

SCENE:
- Use a PERSON that matches the industry of the TARGET
  (EXAMPLES: CEO for tech, ceo for content tools, ceo for Canva, ceo for CapCut)
- Show them reacting emotionally upset beside a gravestone
- Gravestone text MUST say: “R.I.P. [TARGET]”
- Include subtle visual cues of the industry (UI elements, tools, icons, screens)

---

LOGO RULE:
- Include the official recognizable logo of the TARGET
- Place it subtly near the headline or gravestone
- Do NOT distort or over-enlarge the logo

---

TEXT ON IMAGE:
- Big bold white headline below center: “RIP [TARGET]”
- sub headline white with neon green or yellow or red, or purple  subheadline: 3–6 words max, disruptive
- Add a red “BREAKING” banner (top right or left ore center)
- Highlight 1–2 key words subheadline in neon green, yellow, red, or purple
- Text must be LARGE and readable on mobile

---

VISUAL STYLE:
- dramatic lighting
- shallow depth of field
- cinematic realism (NOT cartoon, NOT over-AI polished)
- clean composition
- strong contrast between subject and background

---

GOAL:
Make it look like a HIGH-PERFORMING viral Facebook marketing image that stops scrolling instantly.`;
  };

  const handleGenerate = async (template) => {
    setLoading(template.id);
    setError('');
    
    try {
      const prompt = buildPrompt();
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
