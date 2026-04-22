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
    <div className="min-h-screen bg-black">
      <img 
        src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png" 
        alt="AI Influencer"
        className="w-full h-screen object-cover"
      />
      <div className="fixed bottom-20 left-0 right-0 flex justify-center">
        <form onSubmit={handleSubmit} className="flex gap-0">
          <input
            type="email"
            required
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/90 border-2 border-black py-3 px-4 text-black placeholder-gray-600 w-64 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white font-bold px-6 py-3 uppercase"
          >
            {loading ? "..." : "Start"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViralLanding;