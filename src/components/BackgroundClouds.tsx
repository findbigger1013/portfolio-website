import React, { useMemo } from 'react';
import { motion } from 'motion/react';

const CloudBlob = ({ className }: { className: string }) => (
   <div className={`absolute rounded-full filter blur-[60px] md:blur-[80px] ${className}`} />
);

function StarTwinkle({ style, size = 20 }: { style: React.CSSProperties, size?: number }) {
  // Use useMemo to prevent re-calculating random values on every re-render
  const { duration, delay } = useMemo(() => ({
    duration: 3 + Math.random() * 3,
    delay: Math.random() * 2
  }), []);

  return (
    <motion.div 
       animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1, 0.5], rotate: [0, 45, 90] }}
       transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
       className="absolute text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
       style={style}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
      </svg>
    </motion.div>
  )
}

export function BackgroundClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* Cloud Group 1 - Top Left to Right */}
      <motion.div 
        animate={{ x: ['-40vw', '110vw'] }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-5%] -left-[30%]"
      >
         <div className="relative w-[800px] h-[500px] opacity-[0.65] mix-blend-plus-lighter">
            <CloudBlob className="w-[400px] h-[400px] bg-pale-rose left-[10%] top-[10%]" />
            <CloudBlob className="w-[500px] h-[350px] bg-white/70 left-[30%] top-[30%]" />
            <CloudBlob className="w-[300px] h-[250px] bg-glow-purple/30 left-[50%] top-[10%]" />
            
            {/* Twinkling stars scattered on the cloud */}
            <StarTwinkle style={{ top: '25%', left: '35%' }} size={24} />
            <StarTwinkle style={{ top: '55%', left: '65%' }} size={16} />
            <StarTwinkle style={{ top: '35%', left: '85%' }} size={20} />
            <StarTwinkle style={{ top: '70%', left: '40%' }} size={12} />
            <StarTwinkle style={{ top: '15%', left: '50%' }} size={18} />
         </div>
      </motion.div>

       {/* Cloud Group 2 - Bottom Right to Left */}
      <motion.div 
        animate={{ x: ['110vw', '-50vw'] }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] -right-[20%]"
      >
         <div className="relative w-[1000px] h-[600px] opacity-[0.55] mix-blend-plus-lighter">
            <CloudBlob className="w-[450px] h-[450px] bg-soft-pink/90 left-[10%] top-[20%]" />
            <CloudBlob className="w-[600px] h-[400px] bg-white/60 left-[20%] top-[40%]" />
            <CloudBlob className="w-[500px] h-[350px] bg-soft-cyan/30 left-[40%] top-[10%]" />
            
            <StarTwinkle style={{ top: '45%', left: '25%' }} size={20} />
            <StarTwinkle style={{ top: '75%', left: '55%' }} size={28} />
            <StarTwinkle style={{ top: '35%', left: '75%' }} size={16} />
            <StarTwinkle style={{ top: '20%', left: '50%' }} size={24} />
            <StarTwinkle style={{ top: '50%', left: '85%' }} size={14} />
         </div>
      </motion.div>
      
      {/* Cloud Group 3 - Slower middle background clouds */}
      <motion.div 
        animate={{ x: ['40vw', '-60vw'] }}
        transition={{ duration: 260, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[15%] right-[10%]"
      >
         <div className="relative w-[600px] h-[400px] opacity-[0.45] mix-blend-plus-lighter">
            <CloudBlob className="w-[400px] h-[300px] bg-white/50 left-[10%] top-[10%]" />
            <CloudBlob className="w-[300px] h-[300px] bg-pale-rose/80 left-[40%] top-[20%]" />
            
            <StarTwinkle style={{ top: '30%', left: '40%' }} size={18} />
            <StarTwinkle style={{ top: '60%', left: '60%' }} size={14} />
            <StarTwinkle style={{ top: '20%', left: '70%' }} size={22} />
         </div>
      </motion.div>

    </div>
  );
}
