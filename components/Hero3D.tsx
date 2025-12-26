
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CandlestickChart, TrendingUp, ShieldCheck } from 'lucide-react';

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 25;
      const y = (e.clientY - innerHeight / 2) / 25;

      gsap.to(containerRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-lg aspect-square flex items-center justify-center perspective-container"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />

      {/* 3D Cards */}
      <div className="relative w-64 h-80 glass-panel rounded-3xl border-emerald-500/30 flex flex-col p-6 shadow-2xl" style={{ transform: 'translateZ(50px)' }}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black">
              <TrendingUp size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">BTC/USD</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400">+4.28%</span>
        </div>
        
        <div className="flex-1 flex items-end gap-1 mb-6">
          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-400 rounded-t-sm animate-pulse" 
              style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} 
            />
          ))}
        </div>

        <div className="text-2xl font-black tracking-tighter">$64,821.50</div>
        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Holographic Data Stream</div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 glass-panel rounded-2xl flex flex-col items-center justify-center border-emerald-500/10" style={{ transform: 'translateZ(100px) translateX(120px) translateY(-50px)' }}>
        <ShieldCheck className="text-emerald-400 mb-2" size={32} />
        <span className="text-[8px] font-black uppercase tracking-tighter text-center">Protocol<br/>Secured</span>
      </div>

      <div className="absolute bottom-0 left-0 w-24 h-24 glass-panel rounded-full flex flex-center border-emerald-500/10" style={{ transform: 'translateZ(80px) translateX(-100px) translateY(40px)' }}>
        <div className="m-auto text-emerald-400 animate-spin-slow">
            <CandlestickChart size={24} />
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
