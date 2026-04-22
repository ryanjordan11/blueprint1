import { useState, useEffect } from 'react';

const ViralLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);

  return (
    <div className="bg-black">
      <img 
        src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png" 
        alt="AI Influencer"
        style={{ 
          display: 'block', 
          margin: '0 auto', 
          paddingTop: '60vh',
          opacity: opacity,
          transition: 'opacity 0.1s'
        }}
      />
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        opacity: opacity,
        transition: 'opacity 0.1s'
      }}>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 60px)', fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.2' }}>
          The world's most advanced engine for building and scaling AI influencers. From pixel-perfect visuals to autonomous voice, we build the icons of tomorrow.
        </h1>
      </div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
    </div>
  );
};

export default ViralLanding;