
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, TrendingUp, BarChart3, CandlestickChart, ShieldAlert, LineChart, Target, Zap, Activity } from 'lucide-react';
import Background from './components/Background';
import Hero3D from './components/Hero3D';
import { getEducationalInsight, getPlaygroundChallenge } from './services/geminiService';
import { Insight, LoadingStatus } from './types';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [insight, setInsight] = useState<Insight | null>(null);
  const [challenge, setChallenge] = useState<{ challenge: string; hint: string } | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [playgroundLoading, setPlaygroundLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Entrance Sequence
      const tl = gsap.timeline();
      
      tl.from(".nav-el", {
        y: -50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
      })
      .from(".reveal-3d", {
        z: -1000,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: "expo.out"
      }, "-=0.8")
      .from(".hero-visual", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      }, "-=1.5")
      .from(".fade-in", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=1");

      // Continuous 3D floating effect
      gsap.to(".floating-element", {
        y: -20,
        rotateZ: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, mainRef);

    fetchInsight();
    loadNewChallenge();

    return () => ctx.revert();
  }, []);

  const fetchInsight = async () => {
    try {
      const data = await getEducationalInsight();
      setInsight(data);
    } catch (err) {
      console.error("Market data sync failed", err);
    }
  };

  const loadNewChallenge = async () => {
    setPlaygroundLoading(true);
    try {
      const data = await getPlaygroundChallenge();
      setChallenge(data);
      gsap.fromTo(".playground-box", { opacity: 0, z: -50 }, { opacity: 1, z: 0, duration: 0.8, ease: "expo.out" });
    } finally {
      setPlaygroundLoading(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      gsap.fromTo(".success-txt", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" });
    }
  };

  return (
    <div ref={mainRef} className="relative min-h-screen text-white overflow-x-hidden">
      <Background />
      <div className="hologram-grid"></div>

      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 py-10 flex justify-between items-center">
        <div className="nav-el flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <TrendingUp size={28} className="text-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">Edufintra</span>
        </div>
        <div className="hidden lg:flex space-x-14">
          {['Ecosystem', 'Algorithms', 'Archives'].map((item) => (
            <a key={item} href="#" className="nav-el text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 hover:text-emerald-400 transition-all">
              {item}
            </a>
          ))}
        </div>
        <div className="nav-el hidden md:block">
          <span className="px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
            <Activity size={12} className="animate-pulse" />
            V0.2.0 Calibrating
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container  mx-auto md:px-12 px-6 pt-48 pb-32 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="w-full lg:w-1/2 text-left space-y-8">
          <div className="fade-in inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <ShieldAlert size={14} className="text-emerald-500" />
            Under Protocol Maintenance
          </div>

          <h1 className="max-w-5xl ">
            <span className="reveal-3d block text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85]">TRADING</span>
            <span className="reveal-3d block text-6xl md:text-[7rem] font-black tracking-tighter text-gradient leading-[0.85]">INTELLIGENCE</span>
          </h1>

          <p className="fade-in text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
            The architecture of modern trading is being redefined. Edufintra is synchronizing its neural engine. Join the waitlist for the <span className="text-white font-bold">Mainnet Genesis.</span>
          </p>

          <div className="fade-in w-full max-w-lg pt-4">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  required
                  placeholder="Enter Neural Key (Email)..."
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-all placeholder:text-gray-700 font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-95">
                  Secure Access <Mail size={18} />
                </button>
              </form>
            ) : (
              <div className="success-txt py-6 px-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs">
                NODE SYNCHRONIZED. PREPARE FOR ASCENSION.
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center hero-visual">
          <Hero3D />
        </div>
      </header>

      {/* 3D Playground Section */}
        <section className="container mx-auto px-6 py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8">
            <div className="flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-[0.4em] text-xs">
              <CandlestickChart size={20} />
              Alpha Playground
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Sharpen Your <br/>Technical Edge</h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              While we optimize the platform, engage with our logic sandbox. Solve complex market patterns generated by our neural core.
            </p>
            {insight && (
              <div className="p-6 rounded-2xl bg-emerald-500/5 border-l-2 border-emerald-500">
                <p className="text-emerald-400 font-medium italic mb-2">"{insight.wisdom}"</p>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">— Market Insight: {insight.topic}</span>
              </div>
            )}
          </div>

          <div className="playground-box glass-panel rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden min-h-[400px] flex flex-col justify-center border-emerald-500/20">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <LineChart size={200} />
            </div>
            
            {playgroundLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Calibrating Market Logic...</span>
              </div>
            ) : (
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                  <Target size={14} /> Pattern Verification
                </div>
                <h3 className="text-2xl md:text-3xl font-light mb-10 leading-snug">
                  {challenge?.challenge}
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <button 
                    onClick={loadNewChallenge}
                    className="px-8 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors"
                  >
                    Generate Pattern
                  </button>
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                    Logic: {challenge?.hint}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid with 3D Interaction */}
      <section className="container mx-auto px-6 md:px-20 py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-left">
          <FeatureItem 
            icon={<BarChart3 size={40} className="text-emerald-400" />}
            title="NEURAL ANALYTICS"
            desc="Moving beyond technical analysis into cognitive behavioral mapping of high-volume flows."
          />
          <FeatureItem 
            icon={<Target size={40} className="text-emerald-400" />}
            title="KINETIC TRAINING"
            desc="Haptic simulation modules that teach you to feel the market rhythm before you see it."
          />
          <FeatureItem 
            icon={<TrendingUp size={40} className="text-emerald-400" />}
            title="ALPHA SYNTHESIS"
            desc="Aggregating fragmented data into actionable sovereign intelligence protocols."
          />
        </div>
      </section>

      {/* Enhanced Footer Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...Array(2)].map((_, j) => (
            <React.Fragment key={j}>
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-12 text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500/50">
                  BTC <span className="text-emerald-400">▲ 64,821</span> • 
                  ETH <span className="text-red-500">▼ 3,492</span> • 
                  SYSTEM <span className="text-white">OPTIMIZING</span> • 
                  EDUFINTRA PROTOCOL <span className="text-emerald-400">ACTIVE</span> • 
                  GENESIS BLOCK <span className="text-white">PENDING</span> • 
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* <footer className="pt-32 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-10 flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="text-left space-y-4">
            <div className="text-4xl font-black italic uppercase tracking-tighter">Edufintra</div>
            <p className="text-gray-600 text-[11px] font-black tracking-[0.4em] uppercase max-w-sm">The Architecture of Trading Intelligence. Sovereignty through mastery.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-[10px] font-black tracking-[0.5em] uppercase text-gray-500">
            <div className="flex flex-col gap-6">
              <span className="text-white font-black opacity-30">SOCIAL</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">X / Twitter</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Discord</a>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white font-black opacity-30">LABS</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">Quant Lab</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Manifesto</a>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white font-black opacity-30">SYSTEM</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">Status</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Telemetry</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-10 mt-32 pt-10 border-t border-white/5 text-[9px] font-black tracking-[0.6em] uppercase text-gray-800 text-center md:text-left">
          © 2024 EDUFINTRA LABS. ALL NEURAL LINKS SECURED. SYSTEM NOMINAL.
        </div>
      </footer> */}
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="group space-y-10 cursor-default">
    <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:rotate-12 transition-all duration-700">
      <div className="group-hover:scale-125 transition-transform duration-700">
        {icon}
      </div>
    </div>
    <div className="space-y-4">
      <h3 className="text-3xl font-black tracking-tight group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-gray-500 text-lg leading-relaxed font-light">{desc}</p>
    </div>
  </div>
);

export default App;
