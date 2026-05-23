import React from 'react';
import { FadeIn } from './FadeIn';
import { PlaceholderImage } from './PlaceholderImage';
import { Star } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function FinalOutcome() {
  const visuals = [
    { text: "[Final Outcome: Device full view]", span: "col-span-2 row-span-2", tilt: "-rotate-1" },
    { text: "[Final Outcome: Dream image prints]", span: "col-span-1 row-span-1", tilt: "rotate-2" },
    { text: "[Final Outcome: Interaction scenario]", span: "col-span-1 row-span-1", tilt: "-rotate-2" },
    { text: "[Final Outcome: Storyboard]", span: "col-span-2 row-span-1", tilt: "rotate-1" }
  ];

  return (
    <section id="chapter-one-outcome" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <FadeIn className="text-center mb-16 relative">
          <Star className="absolute top-0 right-1/4 w-8 h-8 text-star-yellow animate-pulse opacity-50" fill="currentColor" />
          <div className="mb-2 uppercase text-[10px] tracking-[0.2em] font-bold text-neon-pink opacity-70">
            07 / Final Outcome
          </div>
          <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text">Project Gallery</h3>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {visuals.map((vis, i) => (
             <div 
               key={i} 
               className={`${vis.span} `}
               onMouseEnter={soundManager.playSwipe}
               onClick={soundManager.playClick}
             >
               <FadeIn delay={0.1 * i} className="w-full h-full">
                  <div className={`w-full h-full bg-white/40 backdrop-blur-md rounded-[2rem] p-3 border border-white/60 shadow-[0_10px_30px_rgba(205,183,246,0.15)] hover:shadow-[0_20px_50px_rgba(169,120,255,0.3)] transition-all duration-700 transform ${vis.tilt} hover:rotate-0 hover:scale-[1.02] hover:z-10 relative cursor-pointer`}>
                     <PlaceholderImage text={vis.text} className="w-full h-full !bg-white/50 border-none rounded-[1.5rem]" />
                  </div>
               </FadeIn>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
