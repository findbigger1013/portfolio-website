import React from 'react';
import { FadeIn } from './FadeIn';
import { Mic, HeartPulse, Palette, Flower2, Image as ImageIcon, Printer, MessageCircle, Moon, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function InteractionFlow() {
  const steps = [
    { icon: Moon, en: "Recall Dream", zh: "回忆梦境", sound: soundManager.playDreamyBell },
    { icon: Mic, en: "Record Voice", zh: "记录声音", sound: soundManager.playWave },
    { icon: HeartPulse, en: "Heart Rate", zh: "采集心率", sound: soundManager.playPulse },
    { icon: Palette, en: "Emotion Color", zh: "情绪颜色", sound: soundManager.playSparkle },
    { icon: Flower2, en: "Remote Bloom", zh: "远程绽放", glow: true, sound: soundManager.playBloom },
    { icon: ImageIcon, en: "AI Image", zh: "AI图像", sound: soundManager.playSparkle },
    { icon: Printer, en: "Print Memory", zh: "打印保存", sound: soundManager.playPaper },
    { icon: MessageCircle, en: "Feedback", zh: "对方反馈", sound: soundManager.playMessage },
  ];

  return (
    <section id="chapter-one-flow" className="py-24 relative z-10 overflow-hidden">
      {/* Background dream waves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-10" preserveAspectRatio="none" viewBox="0 0 1000 200">
         <path d="M 0 100 Q 250 150 500 100 T 1000 100" fill="none" stroke="url(#wave-gradient)" strokeWidth="8" style={{ filter: 'blur(8px)' }} />
         <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1000" y2="0">
               <stop offset="0%" stopColor="#FF5FA2" />
               <stop offset="50%" stopColor="#A978FF" />
               <stop offset="100%" stopColor="#8BE8FF" />
            </linearGradient>
         </defs>
      </svg>

      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <FadeIn className="text-center mb-20">
          <div className="mb-2 uppercase text-[10px] tracking-[0.2em] font-bold text-glow-purple opacity-70">
            05 / Journey Map
          </div>
          <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text">Dream Journey Flow</h3>
        </FadeIn>

        <div className="relative">
          {/* Constrained layout for desktop */}
          <div className="flex flex-row items-center gap-6 md:gap-4 lg:gap-2 px-4 py-8 overflow-x-auto snap-x hide-scroll justify-start md:justify-between">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center min-w-[110px] snap-center group relative z-10 mt-[min(20px,auto)] md:mt-0 cursor-pointer" 
                style={{ transform: `translateY(${i % 2 === 0 ? '-15px' : '15px'})` }}
                onMouseEnter={step.sound}
                onClick={soundManager.playClick}
              >
                <FadeIn delay={0.1 * i} className="flex flex-col items-center w-full">
                  {/* Connection line segment (pseudo-element style) */}
                  {i !== steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[28px] left-[60%] w-full h-[2px] bg-gradient-to-r from-glow-purple/20 to-glow-purple/20 border-b border-dashed border-glow-purple/40 -z-10" style={{ width: 'calc(100% + 2rem)' }} />
                  )}

                  <div className="relative mb-6">
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-[2rem] blur-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${step.glow ? 'bg-neon-pink opacity-40 blur-[20px]' : 'bg-glow-purple opacity-30 blur-[15px]'}`} />
                    
                    {/* Icon Node (Cloud/Flower shape substitute via CSS border-radius tricks) */}
                    <div className={`relative w-14 h-14 bg-white/60 backdrop-blur-md border border-white rounded-3xl group-hover:rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(169,120,255,0.3)] z-10 text-glow-purple ${step.glow ? 'ring-2 ring-neon-pink/50 text-neon-pink bg-white/80' : ''}`}>
                      <step.icon size={24} strokeWidth={1.5} />
                      {step.glow && <Sparkles className="absolute -top-3 -right-3 w-5 h-5 text-star-yellow animate-pulse" />}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-[13px] font-medium tracking-wide text-brand-text mb-1 whitespace-nowrap">{step.en}</div>
                    <div className="text-[11px] font-light text-brand-muted">{step.zh}</div>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
