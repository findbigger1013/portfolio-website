import React from 'react';
import { FadeIn } from './FadeIn';
import { Flower2, Heart, MessageCircle, CloudMoon } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function ResearchInsights() {
  const data = [
    {
      value: "94.7%",
      icon: Flower2,
      en: "Interested in using a dream-sharing device",
      zh: "对梦境分享装置感兴趣",
      style: "col-span-1 md:col-span-2 row-span-2 bg-white/50 rounded-[3rem] p-10 flex flex-col justify-end min-h-[300px]",
      valStyle: "text-6xl md:text-8xl text-neon-pink",
      color: "text-neon-pink"
    },
    {
      value: "100%",
      icon: Heart,
      en: "Believe dream sharing can bring people closer",
      zh: "认为分享梦境能拉近关系",
      style: "col-span-1 rounded-[100px] bg-gradient-to-br from-glow-purple/20 to-soft-cyan/10 border-2 border-white/50 p-8 flex flex-col items-center justify-center text-center aspect-square md:aspect-auto transform md:-rotate-3 hover:rotate-0",
      valStyle: "text-5xl text-glow-purple",
      color: "text-glow-purple"
    },
    {
      value: "84.2%",
      icon: MessageCircle,
      en: "Interested when friends share dreams",
      zh: "对朋友分享梦境感到有趣",
      style: "col-span-1 rounded-[2rem] bg-white/60 p-8 flex flex-col border border-white/80 shadow-lg",
      valStyle: "text-4xl text-soft-cyan",
      color: "text-soft-cyan"
    },
    {
      value: "73.6%",
      icon: CloudMoon,
      en: "Perceive dreams as colorful",
      zh: "觉得自己的梦境是有彩色的",
      style: "col-span-1 md:col-span-2 rounded-[2rem] md:rounded-[4rem] bg-gradient-to-r from-pale-rose/50 to-white/60 p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-white/80",
      valStyle: "text-5xl text-brand-text opacity-80",
      color: "text-brand-text",
      iconSize: "w-16 h-16"
    }
  ];

  return (
    <section id="chapter-one-research" className="py-24 relative z-10 my-12">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        <FadeIn className="mb-2 uppercase text-[10px] tracking-[0.2em] font-bold text-soft-cyan opacity-70">
          02 / Research
        </FadeIn>
        <FadeIn className="mb-12">
          <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)]">Dream Dashboard</h3>
        </FadeIn>

        {/* Artistic Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min relative">
          
          {/* Background connectors / art */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30" style={{ filter: 'drop-shadow(0 0 8px rgba(169,120,255,0.5))' }}>
            <path d="M 100 100 Q 300 0 500 150 T 900 100" fill="none" stroke="url(#paint0_linear)" strokeWidth="2" strokeDasharray="6 6" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1000" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF5FA2" />
                <stop offset="1" stopColor="#A978FF" />
              </linearGradient>
            </defs>
          </svg>

          {data.map((item, i) => (
            <div 
              key={i} 
              className={`${item.style} backdrop-blur-md relative group hover:shadow-[0_12px_40px_rgba(169,120,255,0.15)] transition-all duration-500 overflow-hidden cursor-pointer`}
              onMouseEnter={soundManager.playSparkle}
              onClick={soundManager.playClick}
            >
              <FadeIn delay={0.1 * i} className="w-full h-full flex flex-col items-start md:items-center">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 flex-1 flex flex-col md:flex-row justify-between w-full h-full items-start md:items-center">
                   <div className="flex-1">
                     <div className={`font-serif italic font-light mb-2 ${item.valStyle}`}>{item.value}</div>
                     <p className="text-[15px] font-medium text-brand-text mb-1 leading-snug max-w-[200px]">{item.en}</p>
                     <p className="text-[12px] text-brand-muted/80 font-light">{item.zh}</p>
                   </div>
                   <item.icon strokeWidth={1} className={`${item.iconSize || 'w-10 h-10'} mt-4 md:mt-0 opacity-50 ${item.color} group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
