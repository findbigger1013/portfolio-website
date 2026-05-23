import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Background } from './components/BackgroundAndChallenge';
import { ResearchInsights } from './components/ResearchInsights';
import { DesignConcept } from './components/DesignConcept';
import { PrototypeGallery } from './components/PrototypeGallery';
import { InteractionFlow } from './components/InteractionFlow';
import { UserTestingAndFindings } from './components/UserTestingAndFindings';
import { FinalOutcome } from './components/FinalOutcome';
import { ReflectionAndFuture } from './components/ReflectionAndFuture';
import { SoundToggle } from './components/SoundToggle';
import { BackgroundClouds } from './components/BackgroundClouds';
import { MeteorShower } from './components/MeteorShower';
import { ChapterTwo } from './components/ChapterTwo';
import { ChapterThree } from './components/ChapterThree';
import { ChapterFour } from './components/ChapterFour';
import { ChapterOneInteractive } from './components/ChapterOneInteractive';
import { ChapterOneOverview } from './components/ChapterOneOverview';
import { soundManager } from './lib/sound';
import { Flower2, Heart, Trees, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'bloom' | 'forgetMeNot' | 'squirrel' | 'vrStress'>('bloom');

  const handleTabChange = (tab: 'bloom' | 'forgetMeNot' | 'squirrel' | 'vrStress') => {
    soundManager.playSwipe();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen text-brand-text font-sans antialiased overflow-x-hidden relative pb-16">
      
      {/* Floating Glassmorphic Chapter Toggler */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
        <div className="bg-white/45 backdrop-blur-xl border border-white/60 p-1.5 rounded-full shadow-[0_8px_32px_rgba(205,183,246,0.35)] flex justify-between items-center w-full pointer-events-auto gap-0.5 sm:gap-1">
          <button
            onClick={() => handleTabChange('bloom')}
            onMouseEnter={soundManager.playHover}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 relative ${activeTab === 'bloom' ? 'bg-gradient-to-r from-neon-pink to-glow-purple text-white shadow-md' : 'text-brand-text hover:bg-white/20'}`}
          >
            <Flower2 size={12} className={activeTab === 'bloom' ? 'animate-spin' : ''} style={{ animationDuration: '40s' }} />
            <span><span className="hidden md:inline">Chapter 1: </span>Bloom</span>
          </button>
          
          <button
            onClick={() => handleTabChange('forgetMeNot')}
            onMouseEnter={soundManager.playHover}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 relative ${activeTab === 'forgetMeNot' ? 'bg-gradient-to-r from-glow-purple to-pink-500 text-white shadow-md' : 'text-brand-text hover:bg-white/20'}`}
          >
            <Heart size={12} className={activeTab === 'forgetMeNot' ? 'animate-pulse' : ''} />
            <span><span className="hidden md:inline">Chapter 2: </span>Care</span>
          </button>

          <button
            onClick={() => handleTabChange('squirrel')}
            onMouseEnter={soundManager.playHover}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 relative ${activeTab === 'squirrel' ? 'bg-gradient-to-r from-emerald-750 to-amber-700 bg-emerald-700 text-white shadow-md' : 'text-brand-text hover:bg-white/20'}`}
          >
            <Trees size={12} className={activeTab === 'squirrel' ? 'animate-bounce' : ''} />
            <span><span className="hidden md:inline">Chapter 3: </span>Co-Live</span>
          </button>

          <button
            onClick={() => handleTabChange('vrStress')}
            onMouseEnter={soundManager.playHover}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 relative ${activeTab === 'vrStress' ? 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-[0_4px_20px_rgba(168,85,247,0.45)] border border-violet-450/40 scale-[1.02]' : 'text-brand-text hover:bg-white/20'}`}
          >
            <Brain size={12} className={activeTab === 'vrStress' ? 'animate-pulse' : ''} />
            <span><span className="hidden md:inline">Chapter 4: </span>Stress</span>
          </button>
        </div>
      </div>

      <BackgroundClouds />
      <MeteorShower mode={activeTab === 'squirrel' ? 'leaves' : 'meteors'} />

      <AnimatePresence mode="wait">
        {activeTab === 'bloom' && (
          <motion.div 
            key="bloom-chapter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Hero />
            <ChapterOneOverview />
            <Background />
            <ResearchInsights />
            <DesignConcept />
            <InteractionFlow />
            <ChapterOneInteractive />
            <PrototypeGallery />
            <UserTestingAndFindings />
            <FinalOutcome />
            <ReflectionAndFuture />
          </motion.div>
        )}
        
        {activeTab === 'forgetMeNot' && (
          <motion.div 
            key="care-chapter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ChapterTwo />
          </motion.div>
        )}

        {activeTab === 'squirrel' && (
          <motion.div 
            key="squirrel-chapter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ChapterThree />
          </motion.div>
        )}

        {activeTab === 'vrStress' && (
          <motion.div 
            key="vr-stress-chapter"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ChapterFour />
          </motion.div>
        )}
      </AnimatePresence>

      <SoundToggle />
    </div>
  );
}

