import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ViralLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);

  const heroContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const heroItem = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] } }
      };

  const plans = [
    {
      name: 'Free',
      priceLabel: 'Free',
      tagline: 'See It First',
      description: "Understand exactly what’s working and why.",
      buttonText: 'Get Free Access',
      features: ['Breakdown of the hooks', 'How the system works', 'What to do next']
    },
    {
      name: '$7',
      priceLabel: '$7',
      tagline: 'Done For You Content',
      description: 'You enter your niche. It generates content you can start posting immediately.',
      buttonText: 'Get Instant Content',
      features: ['Hooks that actually get pushed', 'Pre-built posts', 'No guessing']
    },
    {
      name: '$27/mo',
      priceLabel: '$27/mo',
      tagline: 'On Demand System',
      description: 'Create content whenever you want.',
      buttonText: 'Start Generating',
      popular: true,
      features: ['Unlimited content generation', 'Proven hooks + structure', 'Built for your niche']
    },
    {
      name: '$47/mo',
      priceLabel: '$47/mo',
      tagline: 'Full System',
      description: 'This is where it actually clicks.',
      buttonText: 'Run The System',
      best: true,
      features: ['Daily posting structure', 'What to post + when', "What’s trending right now", 'Full execution system']
    },
    {
      name: '$99/mo',
      priceLabel: '$99/mo',
      tagline: 'Full Operating System',
      description: 'Everything. No gaps.',
      buttonText: 'Unlock Full Access',
      features: ['Strategy + data breakdown', 'Performance insights', 'Full automation tools', 'All systems combined']
    }
  ];

  const beats = [
    {
      title: "You’re trying everything.",
      lines: ["Posting. Testing. Switching styles.", "And still…", "Nothing."]
    },
    {
      title: "One post hits.",
      lines: ["Everything else dies.", "No comments.", "No traction.", "No sales."]
    },
    {
      title: "And here’s the part that should piss you off:",
      lines: ["People with 20,000+ followers…", "Are getting the same result.", "Nothing."]
    },
    {
      title: "It’s not your effort.",
      lines: ["It’s not “the algorithm changing.”", "You’re posting the wrong shit."]
    },
    {
      title: "I proved that.",
      lines: ["Six months.", "Millions of posts.", "Hundreds of creators.", "Same outcome every time."]
    },
    {
      title: "The ones growing?",
      lines: ["They’re not better.", "They’re not smarter.", "They’re using the same exact hooks."]
    },
    {
      title: "Not similar.",
      lines: ["The same.", "Over and over.", "Across every niche."]
    },
    {
      title: "Those hooks do one thing:",
      lines: ["They force people to stop.", "That’s it."]
    },
    {
      title: "Stop scrolling → engage → algorithm pushes.",
      lines: ["That’s the game.", "That’s always been the game."]
    },
    {
      title: "So I built it.",
      lines: ["Not advice.", "Not ideas.", "A system."]
    },
    {
      title: "It gives you:",
      lines: ["The hooks.", "The structure.", "The content.", "Already working."]
    },
    {
      title: "You’ve got two ways to run it:",
      lines: ["Become an AI influencer.", "Or use it in your niche.", "Same system."]
    },
    {
      title: "This is being released now.",
      lines: ["Early access.", "You lock in before full release."]
    },
    {
      title: "If you’re going to keep guessing,",
      lines: ["Don’t get it."]
    },
    {
      title: "If you’re ready to actually run what works,",
      lines: ["Lock in."]
    }
  ];

  const pricingContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } }
  };

  const pricingItem = reduceMotion
    ? { hidden: { opacity: 1, y: 0, filter: 'blur(0px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }
    : {
        hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } }
      };

  const pricingWords = 'CHOOSE YOUR LEVEL'.split(' ');
  const wordContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
  };

  const wordItem = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

  return (
    <div className="bg-black text-white">
      <div ref={scrollRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* Hero */}
        <section className="relative min-h-screen flex flex-col overflow-x-hidden snap-start">
          <div className="w-full px-6 pt-10 md:pt-20">
            <div className="max-w-6xl mx-auto">
              <motion.div variants={heroContainer} initial="hidden" animate="show">
                <h1
                  style={{
                    fontSize: 'clamp(32px, 6vw, 72px)',
                    fontWeight: 'bold',
                    maxWidth: '900px',
                    lineHeight: '1.1',
                    color: 'white',
                    textAlign: 'left'
                  }}
                >
                  <motion.span variants={heroItem} style={{ display: 'block' }}>
                    Let's cut the bullshit.
                  </motion.span>
                  <motion.span variants={heroItem} style={{ display: 'block', color: 'white' }}>
                    You're getting ignored because you're posting the wrong shit.
                  </motion.span>
                </h1>

                <motion.div
                  variants={heroItem}
                  style={{
                    fontSize: 'clamp(16px, 2vw, 22px)',
                    maxWidth: '700px',
                    color: '#999',
                    lineHeight: '1.4',
                    margin: '20px 0 0'
                  }}
                >
                  Even people with 20,000+ followers are getting nothing right now.
                  <br />
                  No reach. No comments. No sales. Because they're not using the hooks Facebook actually pushes. I spent six months, analyzed millions of posts, and found the exact patterns that work. I turned it into a system. Now you don't guess, you run what already works.
                </motion.div>
              </motion.div>
            </div>
          </div>

          <img
            src="/vmn7lN1z2X1oPWlzb8KcjKhWcHY.png"
            alt="AI Influencer"
            className="mt-auto w-screen max-w-none h-[45vh] md:h-[50vh] object-contain object-bottom"
            style={{ display: 'block', margin: 0, opacity: opacity, transition: 'opacity 0.1s' }}
          />
        </section>

        {/* Controlled Scroll Narrative */}
        {beats.map((beat, idx) => (
          <section key={idx} className="min-h-screen snap-start flex items-center px-6">
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-white/30 text-xs font-bold tracking-[0.35em] uppercase mb-6">
                Scroll {idx + 1}
              </div>
              <div className="max-w-3xl">
                {[beat.title, ...beat.lines].map((line, j) => (
                  <div key={j} className="text-4xl md:text-6xl font-black leading-[0.95]">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Pricing Section */}
        <section className="snap-start min-h-screen px-4 relative overflow-x-hidden">
          {/* Background grid + glow */}
          <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(55%_55%,white,transparent)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_80px]" />
          </div>
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full blur-[90px] opacity-40"
            style={{ background: 'radial-gradient(circle at center, #3131f5 0%, transparent 70%)' }}
          />

          <motion.article
            variants={pricingContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="text-center pt-24 md:pt-32 max-w-4xl mx-auto space-y-5 relative z-10"
          >
            <motion.h2
              variants={wordContainer}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.18em]"
              style={{ lineHeight: 1 }}
            >
              {pricingWords.map((w, i) => (
                <motion.span key={i} variants={wordItem} className="inline-block mr-3">
                  {w}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p variants={pricingItem} className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
              Pick the level you want. Same system. Different depth.
            </motion.p>
          </motion.article>

          <motion.div
            variants={pricingContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto py-10 md:py-14"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={pricingItem}
                className={[
                  "relative text-white border border-white/10 rounded-2xl p-6",
                  "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950",
                  plan.popular ? "shadow-[0_-13px_220px_0px_rgba(9,0,255,0.35)] ring-1 ring-blue-500/30" : "",
                  plan.best ? "ring-1 ring-white/25" : ""
                ].join(" ")}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-300/40">
                    Popular
                  </div>
                )}
                {plan.best && !plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/40">
                    Best Value
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-3xl font-black">{plan.priceLabel}</div>
                    <div className="mt-1 text-sm font-black uppercase tracking-wider text-white/60">{plan.tagline}</div>
                  </div>
                </div>

                <div className="mt-4 text-sm md:text-base text-white/70">{plan.description}</div>

                <button
                  className={[
                    "w-full mt-6 py-4 rounded-xl font-black uppercase tracking-wider border transition-all",
                    plan.popular
                      ? "bg-gradient-to-t from-blue-600 to-blue-500 border-blue-400/60 shadow-[0_10px_40px_rgba(37,99,235,0.35)] hover:brightness-110"
                      : "bg-transparent border-white/20 hover:bg-white hover:text-black"
                  ].join(" ")}
                >
                  {plan.buttonText}
                </button>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <span className="mt-2 h-2 w-2 rounded-full bg-white/30" />
                        <span className="text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={pricingContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-10 pb-16 text-center max-w-3xl mx-auto"
          >
            <motion.p variants={pricingItem} className="text-white/80 text-xl md:text-2xl font-black">
              If you’re still guessing, this isn’t for you.
            </motion.p>
            <motion.p variants={pricingItem} className="mt-3 text-white/80 text-xl md:text-2xl font-black">
              If you’re ready to run what’s already working, get in.
            </motion.p>
            <div className="mt-12 text-gray-600 text-xs uppercase tracking-widest">
              <p>&copy; {new Date().getFullYear()} AI Influencer System</p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default ViralLanding;
