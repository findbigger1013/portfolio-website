import React from 'react';
import { FadeIn } from './FadeIn';
import { PlaceholderImage } from './PlaceholderImage';
import { Star } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function FinalOutcome() {
 const visuals = [
  {
    text: "images/dream-bloom/final-outcome.png",
    title: "Device Full View",
    description: "A final view of the flower-shaped dream sharing device.",
    span: "col-span-2 row-span-2",
    tilt: "-rotate-1",
    fit: "object-contain",
    scale: "scale-90"
  },
  {
    text: "images/dream-bloom/printer-pictures.jpg",
    title: "Dream Image Prints",
    description: "AI-generated dream images printed as visual memory cards.",
    span: "col-span-1 row-span-1",
    tilt: "rotate-2",
    fit: "object-contain",
    scale: "scale-125"
  },
  {
    text: "images/dream-bloom/interaction-scenario.jpg",
    title: "Interaction Scenario",
    description: "A daily interaction scene showing how the device is used.",
    span: "col-span-1 row-span-1",
    tilt: "-rotate-2",
    fit: "object-contain",
    scale: "scale-125"
  },
  {
    text: "images/dream-bloom/storyboard.png",
    title: "Storyboard",
    description: "The process from dream recording to emotional sharing.",
    span: "col-span-2 row-span-2",
    tilt: "rotate-1",
    fit: "object-contain",
    scale: "scale-90"
  }
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
                   <div className="w-full h-full flex flex-col rounded-[1.5rem] bg-white/40 overflow-hidden">
  <div className="flex-1 min-h-0 flex items-center justify-center p-3">
    <img
      src={`${import.meta.env.BASE_URL}${vis.text}`}
      alt={vis.title}
      loading="lazy"
      className={`w-full h-full ${vis.fit} ${vis.scale}`}
    />
  </div>

  <div className="shrink-0 px-4 py-3 bg-white/80 backdrop-blur-md border-t border-white/60">
    <h4 className="font-serif italic text-base md:text-lg text-brand-text text-center">
  {vis.title}
</h4>
  </div>
</div> 
                  </div>
               </FadeIn>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
