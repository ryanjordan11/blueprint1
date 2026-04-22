import { useState } from 'react';

const ViralLanding = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Thanks!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <img 
        src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png" 
        alt="AI Influencer"
        style={{ marginTop: '25vh', marginBottom: '2rem' }}
      />
      <form onSubmit={handleSubmit} className="flex gap-0">
        <input
          type="email"
          required
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{background:'white', border:'2px solid #333', padding:'12px 16px', color:'black', width:'260px'}}
        />
        <button
          type="submit"
          disabled={loading}
          style={{background:'white', color:'black', fontWeight:'bold', padding:'12px 24px', border:'2px solid #333', borderLeft:'none'}}
        >
          {loading ? "..." : "Start"}
        </button>
      </form>
    </div>
  );
};

export default ViralLanding;