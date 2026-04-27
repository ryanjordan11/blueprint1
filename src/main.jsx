import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AIInfluencerLanding from './pages/AIInfluencerLanding.jsx'
import ViralLanding from './pages/ViralLanding.jsx'
import ToolsDashboard from './pages/ToolsDashboard.jsx'
import ViralEngine from './pages/tools/ViralEngine.jsx'
import HooksMatrix from './pages/tools/HooksMatrix.jsx'
import CommentLadder from './pages/tools/CommentLadder.jsx'
import ViralRewriter from './pages/tools/ViralRewriter.jsx'
import ProfileOptimizer from './pages/tools/ProfileOptimizer.jsx'
import ImageGenerator from './pages/tools/ImageGenerator.jsx'
import TrendsRadar from './pages/tools/TrendsRadar.jsx'
import ContentCalendar from './pages/tools/ContentCalendar.jsx'
import RipStudio from './pages/tools/RipStudio.jsx'
import Studio from './pages/tools/Studio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ai" element={<AIInfluencerLanding />} />
        <Route path="/viral" element={<ViralLanding />} />
        <Route path="/tools" element={<ToolsDashboard />} />
        <Route path="/tools/viral-engine" element={<ViralEngine />} />
        <Route path="/tools/hooks" element={<HooksMatrix />} />
        <Route path="/tools/ladder" element={<CommentLadder />} />
        <Route path="/tools/rewriter" element={<ViralRewriter />} />
        <Route path="/tools/profile" element={<ProfileOptimizer />} />
        <Route path="/tools/image" element={<ImageGenerator />} />
        <Route path="/tools/trends" element={<TrendsRadar />} />
        <Route path="/tools/build" element={<ContentCalendar />} />
        <Route path="/tools/rip" element={<RipStudio />} />
        <Route path="/tools/studio" element={<Studio />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)