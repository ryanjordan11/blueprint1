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
      <div className="relative min-h-screen flex flex-col overflow-x-hidden">
        <div className="w-full px-6 pt-10 md:pt-20">
          <div className="max-w-6xl mx-auto">
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 'bold', maxWidth: '900px', lineHeight: '1.1', color: 'white', textAlign: 'left' }}>
            Let's cut the bullshit.<br/>
            <span style={{ color: 'white' }}>You're getting ignored because you're posting the wrong shit.</span>
          </h1>
          <div style={{ fontSize: 'clamp(16px, 2vw, 22px)', maxWidth: '700px', color: '#999', lineHeight: '1.4', margin: '20px 0 0' }}>
            Even people with 20,000+ followers are getting nothing right now.<br/>
            No reach. No comments. No sales. Because they're not using the hooks Facebook actually pushes. I spent six months, analyzed millions of posts, and found the exact patterns that work.
            I turned it into a system. Now you don't guess, you run what already works.
          </div>
          </div>
        </div>

        <img
          src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png"
          alt="AI Influencer"
          className="mt-auto w-screen max-w-none h-[45vh] md:h-[50vh] object-contain object-bottom"
          style={{ display: 'block', margin: 0, opacity: opacity, transition: 'opacity 0.1s' }}
        />
      </div>

      {/* Section Below Hero (pushes pricing down) */}
      <section className="bg-black min-h-screen px-4">
        <div className="max-w-6xl mx-auto h-full" />
      </section>

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
