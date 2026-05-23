import React from 'react';
import { FadeIn } from './FadeIn';
import { Moon, Radio, Sparkles } from 'lucide-react';

export function Background() {
  const cards = [
    {
      icon: Moon,
      title: "Dreams are emotional fragments",
      zh: "梦境是由记忆、潜意识和情绪组成的片段。",
      color: "text-glow-purple",
      bgHover: "hover:border-glow-purple/40"
    },
    {
      icon: Radio,
      title: "Distance weakens presence",
      zh: "远距离沟通缺少身体感、陪伴感和仪式感。",
      color: "text-soft-cyan",
      bgHover: "hover:border-soft-cyan/50"
    },
    {
      icon: Sparkles,
      title: "Dream Bloom makes emotions tangible",
      zh: "通过声音、心率、颜色、AI图像和花形装置，将梦境转化为可感知的情感信息。",
      color: "text-neon-pink",
      bgHover: "hover:border-neon-pink/40"
    }
  ];

  return (
    <section id="chapter-one-background" className="py-24 relative z-10 my-12">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative">
        <FadeIn className="mb-2 uppercase text-[10px] tracking-[0.2em] text-center font-bold text-glow-purple opacity-70">
          01 / Background
        </FadeIn>
        
        <div className="text-center absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none -z-10 overflow-hidden">
           <span className="font-serif italic text-[120px] lg:text-[180px] whitespace-nowrap text-glow-purple select-none blur-[1px]">
             Emotional Fragments
           </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-16">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={0.1 * i} className={`bg-white/40 backdrop-blur-md p-10 rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(255,255,255,0.8)] ${card.bgHover} hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden`}>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <card.icon strokeWidth={1.5} className={`w-12 h-12 mb-8 opacity-70 group-hover:opacity-100 transition-opacity ${card.color} group-hover:scale-110 duration-500`} />
              <h4 className="text-xl md:text-2xl font-serif italic text-brand-text mb-4 leading-snug">{card.title}</h4>
              <p className="text-[14px] text-brand-muted/80 font-light leading-relaxed">{card.zh}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
