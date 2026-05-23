import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { AnimatePresence, motion } from 'motion/react';
import { soundManager } from '../lib/sound';
import { Flower2, HeartPulse, Mic, Printer, PlayCircle, X } from 'lucide-react';

export function PrototypeGallery() {
  const [selectedGif, setSelectedGif] = useState<number | null>(null);

  const gifs = [
    {
      id: 0,
      tag: "MOTION 01",
      title: "Flower Blooming",
      zhTitle: "花形装置开合",
      en: "A quiet notification that turns dream arrival into a ritual.",
      zh: "将梦境到达转化为温柔的仪式感提醒。",
      keywords: "Remote Notification / Tangible Interaction",
      placeholder: "[GIF Placeholder: Flower device opening and closing]",
      icon: Flower2,
    },
    {
      id: 1,
      tag: "MOTION 02",
      title: "Heart-rate Color",
      zhTitle: "心率色彩反馈",
      en: "Heart-rate data is translated into emotional colors.",
      zh: "心率数据被转化为情绪颜色。",
      keywords: "Emotion Visualization",
      placeholder: "[GIF Placeholder: Sensor triggering light color changes]",
      icon: HeartPulse,
    },
    {
      id: 2,
      tag: "MOTION 03",
      title: "Dream Recording",
      zhTitle: "语音记录梦境",
      en: "The user records a dream through voice after waking up.",
      zh: "用户醒来后通过语音记录梦境。",
      keywords: "Voice Interface",
      placeholder: "[GIF Placeholder: User recording a dream with the device]",
      icon: Mic,
    },
    {
      id: 3,
      tag: "MOTION 04",
      title: "AI Image Printing",
      zhTitle: "记忆图像打印",
      en: "AI-generated dream images are printed as visual memories.",
      zh: "AI生成图像并由小型打印机输出。",
      keywords: "Visual Memory",
      placeholder: "[GIF Placeholder: AI-generated dream image being printed]",
      icon: Printer,
    }
  ];

  const handleOpen = (i: number) => {
    soundManager.playClick();
    setSelectedGif(i);
  };

  const handleClose = () => {
    soundManager.playSwipe();
    setSelectedGif(null);
  };

  const MotionPlaceholder = ({ text, onClick, onEnter }: { text: string, onClick: () => void, onEnter: () => void }) => (
    <div 
      className="absolute inset-0 w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-700 select-none overflow-hidden bg-white/50 border border-white/60 flex items-center justify-center p-6 text-center"
      onClick={onClick}
      onMouseEnter={onEnter}
    >
       {/* 
         Instructions for User: 
         To use a real GIF or Video, replace this component's content with:
         <video src="/your-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
         OR 
         <img src="/your-gif.gif" loading="lazy" className="w-full h-full object-cover" /> 
       */}
       <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/10 to-glow-purple/10 pointer-events-none" />
       <span className="font-serif italic text-brand-muted/80 text-sm md:text-base relative z-10">{text}</span>
    </div>
  );

  return (
    <section id="chapter-one-prototype" className="py-24 relative z-10 my-12 bg-white/10 backdrop-blur-sm border-y border-white/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Transition from Design Concept */}
        <FadeIn className="mb-16 text-center max-w-3xl mx-auto">
          <p className="text-[11px] text-brand-muted font-bold tracking-[0.2em] uppercase mb-8 opacity-70">
             These concepts were translated into a physical prototype.
          </p>
          <div className="mb-2 uppercase text-[10px] tracking-[0.2em] font-bold text-soft-cyan opacity-70">
            05 / Prototype
          </div>
          <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text mb-6">Prototype in Motion</h3>
          <p className="text-[14px] text-brand-muted font-light leading-relaxed">
            From flower blooming to emotion visualization, the prototype turns dream sharing into a tangible interaction.<br/>
            <span className="text-[12px] opacity-80 mt-1 block">从花朵绽放到情绪可视化，原型将梦境分享转化为可感知的互动体验。</span>
          </p>
        </FadeIn>

        {/* Prototype Grid */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Featured Large GIF Card */}
          <FadeIn className="md:col-span-3 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-4 md:p-6 shadow-[0_10px_40px_rgba(205,183,246,0.15)] group hover:shadow-[0_20px_60px_rgba(169,120,255,0.25)] hover:-translate-y-1 transform -rotate-1 hover:rotate-0 transition-all duration-700 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-2/3 aspect-[16/9] lg:aspect-[21/9] bg-white/50 rounded-[1.5rem] overflow-hidden relative">
               <MotionPlaceholder text={gifs[0].placeholder} onClick={() => handleOpen(0)} onEnter={soundManager.playSwipe} />
               <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-glow-purple tracking-widest uppercase shadow-sm z-20 flex items-center gap-2 pointer-events-none">
                 <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse"></span>
                 {gifs[0].tag}
               </div>
            </div>
            
            <div className="w-full lg:w-1/3 flex flex-col justify-center px-4 pb-4 lg:pb-0">
               {React.createElement(gifs[0].icon, { className: "w-10 h-10 text-neon-pink mb-4 opacity-80", strokeWidth: 1.5 })}
               <h4 className="text-2xl font-serif italic text-brand-text mb-1">{gifs[0].title}</h4>
               <p className="text-[14px] font-medium text-brand-text mb-4 opacity-80">{gifs[0].zhTitle}</p>
               <div className="space-y-1 mb-6 border-l-2 border-neon-pink/30 pl-4">
                 <p className="text-[14px] text-brand-text/90 font-light leading-snug">{gifs[0].en}</p>
                 <p className="text-[12px] text-brand-muted/80 font-light">{gifs[0].zh}</p>
               </div>
               <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-glow-purple/80">
                 <span className="opacity-50">Keywords:</span> {gifs[0].keywords}
               </div>
            </div>
          </FadeIn>

          {/* Small GIF Cards */}
          {gifs.slice(1).map((gif, i) => {
            const index = i + 1;
            const rotation = index % 2 === 0 ? 'rotate-[1.5deg]' : '-rotate-[1deg]';
            return (
              <FadeIn delay={0.1 * index} key={gif.id} className={`md:col-span-1 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 p-3 shadow-[0_8px_30px_rgba(205,183,246,0.15)] group hover:shadow-[0_15px_40px_rgba(169,120,255,0.25)] hover:-translate-y-1 transform ${rotation} hover:rotate-0 transition-all duration-700 flex flex-col`}>
                <div className="w-full aspect-[4/3] bg-white/50 rounded-[1.5rem] overflow-hidden relative mb-4">
                   <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-glow-purple tracking-widest uppercase shadow-sm z-20 flex items-center gap-1.5 pointer-events-none">
                     <span className="w-1.5 h-1.5 rounded-full bg-soft-cyan"></span>
                     {gif.tag}
                   </div>
                   <MotionPlaceholder text={gif.placeholder} onClick={() => handleOpen(index)} onEnter={soundManager.playSwipe} />
                </div>
                
                <div className="px-3 pb-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                     {React.createElement(gif.icon, { className: "w-5 h-5 text-glow-purple", strokeWidth: 1.5 })}
                     <h4 className="text-[17px] font-serif italic text-brand-text">{gif.title}</h4>
                  </div>
                  <div className="border-l-2 border-glow-purple/20 pl-3 mb-5 space-y-1">
                    <p className="text-[13px] text-brand-text/90 font-light leading-tight">{gif.en}</p>
                    <p className="text-[11px] text-brand-muted/80 font-light">{gif.zh}</p>
                  </div>
                  <div className="mt-auto text-[10px] font-bold tracking-widest uppercase text-soft-cyan">
                    {gif.keywords}
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Transition to next phase */}
        <FadeIn delay={0.4} className="mt-20 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-[1px] h-12 bg-gradient-to-b from-glow-purple/40 to-transparent mb-6"></div>
          <p className="text-[11px] text-brand-muted font-bold tracking-[0.2em] uppercase opacity-70">
            The prototype was then tested in controlled sessions.
          </p>
        </FadeIn>

      </div>

      {/* Lightbox / Video Preview */}
      <AnimatePresence>
        {selectedGif !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-white/70 backdrop-blur-xl"
            onClick={handleClose}
          >
             <motion.div 
               initial={{ scale: 0.95, y: 15 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 15 }}
               className="w-full max-w-4xl bg-white/60 border border-white/80 p-3 md:p-4 rounded-[3rem] shadow-[0_20px_80px_rgba(169,120,255,0.25)] relative"
               onClick={(e) => e.stopPropagation()}
             >
                <button 
                  className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-12 h-12 bg-white/90 backdrop-blur-md border border-white rounded-full flex items-center justify-center text-brand-muted shadow-lg hover:text-neon-pink hover:scale-110 transition-all z-50 pointer-events-auto"
                  onClick={handleClose}
                  onMouseEnter={soundManager.playHover}
                >
                  <X strokeWidth={2} size={20} />
                </button>
                
                <div className="aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden bg-white/80 relative flex flex-col items-center justify-center border border-white/50">
                   <div className="absolute inset-0 bg-gradient-to-tr from-neon-pink/10 via-transparent to-glow-purple/10 pointer-events-none" />
                   
                   {/* Replace with real video in production */}
                   <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center text-brand-muted/70">
                      <PlayCircle className="w-16 h-16 mb-4 text-glow-purple/30 group-hover:scale-110 transition-transform" strokeWidth={1} />
                      <p className="font-serif italic text-lg md:text-xl mb-3">{gifs[selectedGif].placeholder}</p>
                      <code className="text-[11px] bg-white/50 px-4 py-2 rounded-lg font-mono">&lt;video src="your-video.mp4" autoPlay loop muted playsInline /&gt;</code>
                   </div>
                </div>
                
                <div className="p-6 md:p-8 text-center">
                   <div className="inline-flex items-center gap-2 mb-2">
                     <h4 className="text-2xl font-serif italic text-brand-text">{gifs[selectedGif].title}</h4>
                     <span className="text-brand-muted text-lg font-light">/</span>
                     <span className="text-brand-muted text-lg font-light tracking-wide">{gifs[selectedGif].zhTitle}</span>
                   </div>
                   <p className="text-[14px] text-brand-text/90 font-light mt-1">{gifs[selectedGif].en}</p>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
