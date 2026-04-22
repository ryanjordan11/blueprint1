import { useState, useEffect } from 'react';

const ViralLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <div className="bg-black">
      <div style={{ position: 'relative', height: '100vh' }}>
        <img 
          src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png" 
          alt="AI Influencer"
          style={{ 
            position: 'fixed',
            top: '30vh',
            left: 0,
            right: 0,
            margin: 'auto',
            opacity: opacity,
            transition: 'opacity 0.3s'
          }}
        />
      </div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
      <div style={{ height: '100vh' }}></div>
    </div>
  );
};

export default ViralLanding;