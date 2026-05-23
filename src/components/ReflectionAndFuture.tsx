import React from 'react';
import { FadeIn } from './FadeIn';
import { Cloud, Lock, Smartphone, Repeat } from 'lucide-react';

export function ReflectionAndFuture() {
  const futures = [
    { icon: Cloud, en: "Dream archive system", zh: "云端梦境档案库" },
    { icon: Smartphone, en: "Mobile app integration", zh: "手机端联动" },
    { icon: Repeat, en: "Two-way interaction", zh: "双向传递与互动" },
    { icon: Lock, en: "Privacy protection", zh: "隐私加密锁" }
  ];

  return (
    <section id="chapter-one-reflection" className="py-24 relative z-10 border-t border-white/40 overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none -z-10" />
       
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Reflection */}
          <div>
            <FadeIn>
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-8 text-glow-purple">
                08 / Reflection
              </h2>
              <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/60 hover:shadow-[0_20px_60px_rgba(205,183,246,0.2)] transition-shadow duration-500 relative">
                <div className="absolute -left-4 -top-4 text-8xl font-serif text-white/80 opacity-50 select-none">"</div>
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-brand-text mb-8 relative z-10">
                  Design is not about translating dreams perfectly, but about preserving the emotional essence that connects us across distance.
                </p>
                <p className="text-[14px] text-brand-muted/80 leading-relaxed font-light relative z-10 border-l-2 border-neon-pink/30 pl-4">
                  这个项目让我意识到，情感交互设计并不只是增加功能，而是要为人们创造一种更容易表达脆弱、记忆和关心的方式。梦境本身是模糊而私密的，因此设计不需要完全准确地“翻译梦”，而是需要帮助用户保存梦中的情绪，并让远方的人能够温柔地回应。
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Future Development (Map style) */}
          <div className="flex flex-col">
            <FadeIn>
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-8 text-soft-cyan">
                09 / Future Map
              </h2>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {futures.map((item, i) => (
                  <div key={i} className="bg-white/30 backdrop-blur-md rounded-[2rem] p-6 border border-white/50 flex flex-col items-start hover:bg-white/50 transition-colors text-brand-text hover:shadow-[0_10px_30px_rgba(139,232,255,0.2)] group cursor-default">
                     <item.icon strokeWidth={1.5} className="w-8 h-8 mb-4 text-glow-purple opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all" />
                     <span className="text-[14px] font-medium leading-snug mb-1">{item.en}</span>
                     <span className="text-[12px] font-light text-brand-muted">{item.zh}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Footer */}
        <FadeIn delay={0.3} className="pt-8 border-t border-white/50 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-brand-muted font-bold gap-4">
           <div className="flex gap-4 opacity-70">
             <span>Arduino</span>
             <span className="hidden md:inline">Midjourney API</span>
             <span className="hidden md:inline">User Research</span>
          </div>
          <div className="flex gap-4">
             <span className="text-glow-purple">Case Study 01</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
