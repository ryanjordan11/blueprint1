import { motion } from 'framer-motion';
import { Zap, Target, MessageSquare, RefreshCw, User, Image, TrendingUp, Calendar, Skull } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  { id: 'viral-engine', name: 'Viral Content Engine', desc: 'Generate hooks + full post templates', icon: Zap, color: '#e8542a', category: 'Content Creation' },
  { id: 'hooks', name: '25-Hook Matrix', desc: 'Scroll-stopping hooks by category', icon: Target, color: '#d4a20c', category: 'Content Creation' },
  { id: 'ladder', name: 'Comment Ladder Builder', desc: '5-step engagement sequences', icon: MessageSquare, color: '#7b5ea7', category: 'Engagement' },
  { id: 'rewriter', name: 'Viral Rewrite Engine', desc: 'Upgrade any draft to viral', icon: RefreshCw, color: '#2a7dd4', category: 'Content Optimization' },
  { id: 'profile', name: 'Profile Optimizer', desc: 'Bio + headline improvements', icon: User, color: '#1a9e6e', category: 'Profile Optimization' },
  { id: 'image', name: 'Viral Visual Generator', desc: 'Breaking news style images', icon: Image, color: '#c2410c', category: 'Content Creation' },
  { id: 'rip', name: 'RIP Studio', desc: 'Viral gravestone generator', icon: Skull, color: '#dc2626', category: 'Content Creation' },
  { id: 'trends', name: 'AI Trends Radar', desc: 'Real-time news synthesis', icon: TrendingUp, color: '#0ea5e9', category: 'Research & Trends' },
  { id: 'build', name: 'Content Calendar Builder', desc: 'Build your 30-day posting plan', icon: Calendar, color: '#8b5cf6', category: 'Planning & Strategy' },
];

const ToolsDashboard = () => {
  const groupedTools = tools.reduce((acc, tool) => {
    (acc[tool.category] = acc[tool.category] || []).push(tool);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a17] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-[#e8542a] text-xs tracking-[0.2em] uppercase font-bold mb-4">
            Gemini 2.5 Intelligence · RACF Enabled
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1c1a17] mb-4">
            AI Content<br />
            <span className="text-[#e8542a] italic">Productivity Pack</span>
          </h1>
          <p className="text-[#4a4741] text-lg max-w-xl">
            The ultimate creator toolkit for high-performance social content.
          </p>
        </motion.div>

        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1c1a17] mb-6">{category}</h2>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoryTools.map((tool) => (
                <motion.div key={tool.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Link
                    to={`/tools/${tool.id}`}
                    className="block bg-white rounded-2xl p-6 border border-[rgba(28,26,23,0.1)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-lg hover:border-[rgba(28,26,23,0.2)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: tool.color }}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-serif">{tool.name}</h3>
                    <p className="text-sm text-[#4a4741]">{tool.desc}</p>
                    <div className="mt-4 text-xs text-[#9b978e] uppercase tracking-wider font-bold">Open Tool →</div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsDashboard;