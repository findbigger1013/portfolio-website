import React from 'react';
import { FadeIn } from './FadeIn';
import { PlaceholderImage } from './PlaceholderImage';
import { Flower2, Activity, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function DesignConcept() {
  const cards = [
    {
      icon: Flower2,
      en: "01 Flower Notification",
      zh: "花朵绽放作为梦境到达的温柔提醒。",
      img: "images/flower-notification.gif",
      shape: "rounded-[3rem] lg:rounded-l-[3rem] lg:rounded-r-3xl"
    },
    {
      icon: Activity,
      en: "02 Emotion Color Mapping",
      zh: "通过心率与灯光颜色呈现梦中的情绪状态。",
      img: "images/emotional-color-map.gif",
      shape: "rounded-3xl"
    },
    {
      icon: Sparkles,
      en: "03 AI Dream Image",
      zh: "将梦境语音转化为可保存的 AI 视觉记忆。",
      img: "images/ai-dream-image.gif",
      shape: "rounded-[3rem] lg:rounded-r-[3rem] lg:rounded-l-3xl"
    }
  ];

  return (
    <section id="chapter-one-design" className="py-24 relative z-10 my-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <FadeIn className="mb-12 flex items-center justify-between">
          <div>
            <div className="mb-2 uppercase text-[10px] tracking-[0.2em] font-bold text-neon-pink opacity-70">
              03 / Concept
            </div>
            <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text">Core Modules</h3>
          </div>
          <Flower2 className="w-16 h-16 text-glow-purple/20 animate-spin-slow" strokeWidth={1} />
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className={`bg-white/40 backdrop-blur-xl border border-white/60 p-4 ${card.shape} group hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(169,120,255,0.15)] transition-all duration-500 flex flex-col h-full cursor-pointer`}
              onMouseEnter={() => {
                if (i === 0) soundManager.playBloom();
                else if (i === 1) soundManager.playPulse();
                else soundManager.playSparkle();
              }}
              onClick={soundManager.playClick}
            >
              <FadeIn delay={0.1 * i} className="flex flex-col h-full">
                 <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative mb-6">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none opacity-50 block" />
                   <img
  src={`${import.meta.env.BASE_URL}${card.img}`}
  alt={card.en}
  className="w-full h-full object-cover rounded-[2rem]"
/>
                   <div className="absolute bottom-4 left-4 z-20 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-glow-purple shadow-lg">
                     <card.icon strokeWidth={1.5} size={24} />
                   </div>
                 </div>
                 <div className="px-4 pb-6 flex-1 flex flex-col justify-end">
                   <h4 className="text-xl md:text-2xl font-serif italic text-brand-text mb-2">{card.en}</h4>
                   <p className="text-[13px] text-brand-muted/80 font-light">{card.zh}</p>
                 </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
