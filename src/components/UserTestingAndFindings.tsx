import React from 'react';
import { FadeIn } from './FadeIn';
import { PlaceholderImage } from './PlaceholderImage';
import { MessageSquareHeart, Users, Flower2, HeartPulse } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function UserTestingAndFindings() {
  const tests = [
    { title: "KMD Forum 2023", img: "[Testing Photo: KMD Forum 2023]" },
    { title: "PLAY Exhibition 2024", img: "[Testing Photo: PLAY Exhibition 2024]" },
    { title: "Controlled Experiment", img: "[Testing Photo: Dream sharing group]" },
    { title: "Post-test Interview", img: "[Testing Photo: Interview session]" }
  ];

  const quotes = [
    "“It felt more special than a phone message.”",
    "“The AI image made the dream easier to remember.”",
    "“The flower made me feel the other person was closer.”"
  ];

  const findings = [
    {
      title: "More ritual",
      zh: "比手机通知更有仪式感",
      icon: Flower2,
      color: "text-neon-pink"
    },
    {
      title: "Visible emotions",
      zh: "情绪被颜色和图像可视化",
      icon: HeartPulse,
      color: "text-glow-purple"
    },
    {
      title: "Closer distance",
      zh: "远距离关系获得陪伴感",
      icon: Users,
      color: "text-soft-cyan"
    }
  ];

  return (
    <>
      {/* Testing Section */}
      <section id="chapter-one-testing" className="py-24 relative z-10 border-t border-white/40">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <FadeIn className="mb-12">
            <div className="mb-2 uppercase text-[10px] tracking-[0.2em] font-bold text-glow-purple opacity-70">
              06 / Testing
            </div>
            <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text">Experiment Wall</h3>
          </FadeIn>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Photos */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tests.map((test, i) => (
                  <div 
                    key={i} 
                    className={`group relative ${i % 2 === 0 ? 'mt-0 md:mt-8' : 'mt-8 md:mt-0'} cursor-pointer`}
                    onMouseEnter={soundManager.playSwipe}
                    onClick={soundManager.playClick}
                  >
                    <FadeIn delay={0.1 * i} className="w-full h-full">
                      <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white/40 border border-white/60 p-2 shadow-sm group-hover:shadow-[0_10px_30px_rgba(205,183,246,0.2)] group-hover:-translate-y-2 transition-all duration-500 transform rotate-1 group-hover:rotate-0">
                        <PlaceholderImage text={test.img} className="w-full h-full !bg-white/50 border-none rounded-2xl" />
                      </div>
                      <div className="mt-4 text-center">
                         <p className="text-[11px] font-bold uppercase tracking-wider text-brand-text whitespace-nowrap overflow-hidden text-ellipsis">{test.title}</p>
                      </div>
                    </FadeIn>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Feedback quotes */}
            <div className="lg:col-span-4 flex flex-col justify-center gap-6">
               <FadeIn delay={0.4}>
                  <h4 className="text-[13px] font-bold uppercase tracking-widest text-brand-muted mb-4">Participant Feedback</h4>
               </FadeIn>
               {quotes.map((quote, i) => (
                 <FadeIn key={i} delay={0.5 + (0.1 * i)} className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm relative">
                   <MessageSquareHeart className="absolute top-4 right-4 w-6 h-6 text-glow-purple/20" />
                   <p className="text-lg font-serif italic text-brand-text leading-snug pr-8">{quote}</p>
                 </FadeIn>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Findings Section */}
      <section className="py-24 relative z-10 bg-white/10 backdrop-blur-sm border-y border-white/50 my-12">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
          <FadeIn className="mb-16">
            <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text mb-4">What changed through Dream Bloom?</h3>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {findings.map((f, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={soundManager.playHover}
                onClick={soundManager.playClick}
              >
                <FadeIn delay={0.2 * i} className="flex flex-col items-center">
                   <div className="w-24 h-24 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-center mb-6 group-hover:shadow-[0_15px_40px_rgba(169,120,255,0.25)] group-hover:-translate-y-2 transition-all duration-500 relative">
                      <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 bg-current ${f.color}`}></div>
                      <f.icon strokeWidth={1} className={`w-10 h-10 ${f.color} group-hover:scale-110 transition-transform duration-500`} />
                   </div>
                   <h4 className="text-2xl font-serif italic text-brand-text mb-2">{f.title}</h4>
                   <p className="text-[13px] text-brand-muted font-light">{f.zh}</p>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
