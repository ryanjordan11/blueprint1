import { useState, useEffect } from 'react';

const ViralLanding = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);

  const plans = [
    { price: 7, name: 'Basic', features: ['Access to tools', '25 Hook Generator', 'Email support'] },
    { price: 27, name: 'Pro', features: ['Everything in Basic', 'All 6 AI Tools', 'Viral Content Engine', 'Priority support'], popular: true },
    { price: 47, name: 'Premium', features: ['Everything in Pro', 'Unlimited generations', '1-on-1 coaching', 'Custom prompts'], best: true }
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <img 
          src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png" 
          alt="AI Influencer"
          style={{ 
            display: 'block', 
            margin: '0 auto', 
            paddingTop: '10vh',
            opacity: opacity,
            transition: 'opacity 0.1s'
          }}
        />
        <div style={{ 
          position: 'absolute', 
          top: '30%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          width: '100%',
          padding: '0 20px'
        }}>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 60px)', fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.2', margin: '0 auto' }}>
            A System That Shows You Exactly What to Post on Facebook
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 24px)', fontWeight: 'normal', maxWidth: '600px', marginTop: '24px', color: '#888', margin: '24px auto 0' }}>
            No guessing. Just content built from what actually gets reach and engagement.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 px-4">
        <h2 className="text-white text-4xl font-bold text-center mb-16 uppercase tracking-wider">Choose Your Plan</h2>
        
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.price}
              className="bg-black/50 backdrop-blur-lg border border-white/20 p-8 w-80 relative"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 text-xs font-bold uppercase tracking-widest">
                  Popular
                </div>
              )}
              {plan.best && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 text-xs font-bold uppercase tracking-widest">
                  Best Value
                </div>
              )}
              
              <h3 className="text-white text-xl font-bold uppercase tracking-wider mb-2">{plan.name}</h3>
              <div className="text-5xl font-bold text-white mb-8">${plan.price}</div>
              
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-yellow-400">✦</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-4 font-bold uppercase tracking-wider border transition-all ${
                  plan.popular || plan.best 
                    ? 'bg-white text-black hover:bg-gray-200 border-white' 
                    : 'bg-transparent text-white border-white/50 hover:bg-white hover:text-black'
                }`}
              >
                Get {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center text-gray-600 text-xs uppercase tracking-widest border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} AI Influencer System</p>
      </div>
    </div>
  );
};

export default ViralLanding;