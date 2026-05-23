import React from 'react';
import { FadeIn } from './FadeIn';
import { Moon, Flower2, HeartPulse, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PlaceholderImage } from './PlaceholderImage';
import { soundManager } from '../lib/sound';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[45%] text-glow-purple/40">
          <Moon size={48} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[40%] right-[5%] text-neon-pink/30">
          <Flower2 size={64} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] left-[8%] text-soft-cyan">
          <HeartPulse size={36} strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <div className="flex-1 w-full flex flex-col items-start pt-10 relative">
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-2 mb-8 relative z-20">
                {["Interaction Design", "Emotional Communication", "AI Imagery", "Tangible UI"].map((tag) => (
                  <span 
                    key={tag} 
                    onMouseEnter={soundManager.playHover}
                    onClick={soundManager.playClick}
                    className="flex items-center gap-1.5 px-4 py-1.5 cursor-pointer bg-white/40 backdrop-blur-md border border-glow-purple/30 rounded-full text-[11px] font-medium tracking-wide text-brand-text hover:shadow-[0_0_15px_rgba(169,120,255,0.4)] transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-pink to-glow-purple shadow-[0_0_5px_rgba(255,95,162,0.6)]"></span>
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative mb-6">
              <h1 className="font-serif italic text-6xl sm:text-7xl lg:text-[100px] tracking-tight text-brand-text leading-[1.1] drop-shadow-sm">
                Dream
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-glow-purple to-soft-cyan relative">
                  Bloom
                  <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-star-yellow animate-pulse" />
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} className="mb-8 max-w-lg relative z-20">
              <h2 className="text-xl md:text-2xl font-medium tracking-wide text-brand-text mb-4">
                A Multi-sensory Dream Sharing Device for Long-distance Relationships
              </h2>
              <p className="text-sm md:text-base text-brand-muted tracking-wide font-light border-l-2 border-neon-pink/40 pl-3">
                面向远距离亲密关系的多感官梦境分享装置
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="max-w-xl space-y-3 relative z-20">
              <p className="text-base md:text-lg leading-relaxed text-brand-text/90 font-light">
                Dream Bloom transforms dreams into emotional messages through voice, heart-rate data, color, AI-generated images, and a flower-like device.
              </p>
              <p className="text-[13px] md:text-[14px] leading-relaxed text-brand-muted/80 font-light">
                通过声音、心率、颜色、AI图像与花形装置，让远距离的人分享彼此的梦境与情绪。
              </p>
            </FadeIn>
          </div>

          {/* Right: Large Poster */}
          <FadeIn delay={0.5} className="flex-1 w-full relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/20 to-soft-cyan/20 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60"></div>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden bg-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(247,191,216,0.3)] border border-white/60 hover:shadow-[0_12px_48px_rgba(169,120,255,0.4)] transition-all duration-500 rotate-2 hover:rotate-0">
             <img
  src={`${import.meta.env.BASE_URL}images/dream-bloom-test.png`}
  alt="Dream Bloom test image"
  className="w-full h-full object-cover rounded-3xl"
/>
               
               {/* Decorative glass overlays */}
               <div className="absolute top-4 left-4 right-4 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/40 flex items-center px-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-soft-pink"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-glow-purple"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-soft-cyan"></div>
                  </div>
               </div>
               
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-glow-purple opacity-20 blur-3xl rounded-full pointer-events-none"></div>
            </div>
            
            {/* Floating Tags around poster */}
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute text-[10px] top-1/4 -left-6 bg-white/80 backdrop-blur-sm border border-glow-purple/20 px-3 py-1.5 rounded-full shadow-lg font-bold text-glow-purple tracking-widest uppercase rotate-[-10deg] pointer-events-none z-20">
              Dream 01
            </motion.div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
}
