import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AIInfluencerLanding from './pages/AIInfluencerLanding.jsx'
import ViralLanding from './pages/ViralLanding.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ai" element={<AIInfluencerLanding />} />
        <Route path="/viral" element={<ViralLanding />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)