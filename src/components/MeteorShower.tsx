import React, { useMemo } from 'react';
import { motion } from 'motion/react';

function Meteor({ index }: { index: number; key?: React.Key }) {
  const { top, left, delay, duration, length, distance, colorTheme } = useMemo(() => {
    const colors = [
      '255, 255, 255', // White
      '255, 95, 162',  // Neon Pink
      '169, 120, 255', // Glow Purple
      '139, 232, 255', // Soft Cyan
    ];
    
    // 70% chance of pure white glow, 30% chance for project theme colors
    const colorTheme = Math.random() > 0.3 ? colors[0] : colors[Math.floor(Math.random() * colors.length)];

    return {
      top: -20 - Math.random() * 40, // Start above the screen (-20vh to -60vh)
      left: -20 + Math.random() * 180, // Spread from left edge to far right (-20vw to 160vw)
      delay: Math.random() * 15 + index * 0.8, // Staggered delays
      duration: 4 + Math.random() * 5, // 4s to 9s travel time (significantly slower)
      length: 100 + Math.random() * 200, // Tail length
      distance: 1500 + Math.random() * 1000, // Travel length (long enough to cross screen)
      colorTheme
    }
  }, [index]);

  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${left}vw`,
        top: `${top}vh`,
        transform: `rotate(135deg)`
      }}
    >
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ 
          x: distance, 
          opacity: [0, 1, 1, 0] 
        }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.1, 0.5, 1], // Flare quickly, persist for a bit, then slowly fade out
          repeatDelay: 3 + Math.random() * 15 // Wait before generating another meteor
        }}
        className="relative"
        style={{
          width: `${length}px`,
          height: '1.5px', // Very thin core
          background: `linear-gradient(90deg, rgba(${colorTheme}, 0) 0%, rgba(${colorTheme}, 1) 100%)`,
          filter: `drop-shadow(0 0 6px rgba(${colorTheme}, 0.8))`
        }}
      >
        {/* Meteor Head Glow */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            width: '3px',
            height: '3px',
            boxShadow: `0 0 14px 4px rgba(${colorTheme}, 1)`
          }}
        />
      </motion.div>
    </div>
  );
}

function Leaf({ index }: { index: number; key?: React.Key }) {
  const { top, left, delay, duration, size, rotation, swingRange, swingSpeed, leafType, gradientId, colors } = useMemo(() => {
    // Elegant botanical palette of a soft transition forest
    const colorSchemes = [
      { primary: '#047857', secondary: '#10b981', stopOpacity: 0.45 }, // Deep Emerald to Spring Green
      { primary: '#b45309', secondary: '#f59e0b', stopOpacity: 0.4 },  // Warm Chestnut to Golden Amber
      { primary: '#064e3b', secondary: '#059669', stopOpacity: 0.35 }, // Jade Forest to Mint
      { primary: '#78350f', secondary: '#d97706', stopOpacity: 0.4 },  // Coppice Brown to Russet Brass
    ];
    
    return {
      top: -15 - Math.random() * 20, // Start higher above screen
      left: Math.random() * 100, // Left percentage
      delay: Math.random() * 12 + index * 1.8, // Staggered entry
      duration: 15 + Math.random() * 16, // Extra slow, serene falling duration (15s to 31s)
      size: 22 + Math.random() * 20, // size (22px to 42px for visible leaf details)
      rotation: Math.random() * 360, // random start rotation
      swingRange: 25 + Math.random() * 45, // horizontal waving width (px)
      swingSpeed: 5 + Math.random() * 6, // waving cycle speed (s)
      leafType: Math.floor(Math.random() * 4), // 4 different leaf designs
      gradientId: `leaf-grad-${index}-${Math.floor(Math.random() * 10000)}`,
      colors: colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
    };
  }, [index]);

  return (
    <div 
      className="absolute pointer-events-none z-[1]"
      style={{
        left: `${left}%`,
        top: `${top}vh`,
      }}
    >
      <motion.div
        animate={{ 
          y: '120vh',
          rotate: [rotation, rotation + 280, rotation + 540],
          x: [0, swingRange, -swingRange, swingRange * 0.5, 0]
        }}
        transition={{
          y: { duration: duration, delay: delay, repeat: Infinity, ease: "linear" },
          rotate: { duration: duration * 1.2, delay: delay, repeat: Infinity, ease: "linear" },
          x: { duration: swingSpeed, delay: delay, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.08)] transform-gpu hover:scale-110 transition-transform duration-300"
      >
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-85">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity={colors.stopOpacity + 0.15} />
              <stop offset="50%" stopColor={colors.secondary} stopOpacity={colors.stopOpacity} />
              <stop offset="100%" stopColor={colors.primary} stopOpacity={colors.stopOpacity - 0.15} />
            </linearGradient>
          </defs>

          {/* Render one of four beautiful botanical leaf shapes */}
          {leafType === 0 && (
            // Style 0: Oak Leaf (Double layered, scalloped lobes with midrib and veins)
            <g>
              <path 
                d="M16 2.5C16.8 4 15 5.5 17 7.5C19 9.5 21.5 8 20.8 11.5C20.1 15 22.5 16 20.8 18.5C19.1 21 18 19.5 16.5 22C15 24.5 14 26.5 14 28.5L16 29C16 27 17.5 25.5 18 23C18.5 20.5 22 19 22.5 15.5C23 12 21 11.5 22.5 8C24 4.5 18 4.2 16 2.5Z" 
                fill={`url(#${gradientId})`}
              />
              <path 
                d="M16 2.5C15.2 4 17 5.5 15 7.5C13 9.5 10.5 8 11.2 11.5C11.9 15 9.5 16 11.2 18.5C12.9 21 14 19.5 15.5 22C17 24.5 18 26.5 18 28.5L16 29C16 27 14.5 25.5 14 23C13.5 20.5 10 19 9.5 15.5C9 12 11 11.5 9.5 8C8 4.5 14 4.2 16 2.5Z" 
                fill={`url(#${gradientId})`}
              />
              {/* Elegant Veins */}
              <path d="M16 3.5 V26" stroke={colors.primary} strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
              <path d="M16 9 Q20 8 21 10.5" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 13 Q11 13 10 15" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 17 Q21 17 21.5 19.5" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
            </g>
          )}

          {leafType === 1 && (
            // Style 1: Fan Ginkgo Leaf (Broad, majestic fan with fine radiating striations)
            <g>
              <path 
                d="M16 29.5C15.8 24.5 14 20.5 10.5 17C6 13.5 2.5 10.5 4.5 6.5C6.5 2.5 11.5 6 16 11C20.5 6 25.5 2.5 27.5 6.5C29.5 10.5 26 13.5 21.5 17C18 20.5 16.2 24.5 16 29.5Z" 
                fill={`url(#${gradientId})`}
                stroke={colors.primary}
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
              {/* Radial fan veins */}
              <path d="M16 28 C15.5 23 13.5 17.5 8 13.5" stroke={colors.primary} strokeWidth="0.6" opacity="0.4" />
              <path d="M16 28 C16 22 16 15 16 11" stroke={colors.primary} strokeWidth="0.6" opacity="0.4" />
              <path d="M16 28 C16.5 23 18.5 17.5 24 13.5" stroke={colors.primary} strokeWidth="0.6" opacity="0.4" />
              <path d="M16 28 C15.8 21 11.5 15.5 5 10" stroke={colors.primary} strokeWidth="0.5" opacity="0.3" />
              <path d="M16 28 C16.2 21 20.5 15.5 27 10" stroke={colors.primary} strokeWidth="0.5" opacity="0.3" />
            </g>
          )}

          {leafType === 2 && (
            // Style 2: Elegant Elm / Rose Leaf (Toothed outline, high detailed venation)
            <g>
              <path 
                d="M16 2C16 2 7 9 7 17C7 21.5 11 25.5 16 28C21 25.5 25 21.5 25 17C25 9 16 2 16 2Z" 
                fill={`url(#${gradientId})`}
                stroke={colors.primary}
                strokeWidth="0.5"
                strokeOpacity="0.2"
              />
              {/* Toothed highlights */}
              <path d="M16 2.5 M16 2 L14 5 L16 6 L12 9 L15 10 L10 14 L14 15 L8 20 L13 21 C15 25 16 28 16 28" stroke={colors.secondary} strokeWidth="0.5" opacity="0.3" />
              <path d="M16 2 L18 5 L16 6 L20 9 L17 10 L22 14 L18 15 L24 20 L19 21 C17 25 16 28 16 28" stroke={colors.secondary} strokeWidth="0.5" opacity="0.3" />
              {/* Veins */}
              <path d="M16 2V27" stroke={colors.primary} strokeWidth="0.9" opacity="0.55" />
              <path d="M16 7L11 11" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 7L21 11" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 12L10 17" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 12L22 17" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 17L11 23" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
              <path d="M16 17L21 23" stroke={colors.primary} strokeWidth="0.6" opacity="0.45" />
            </g>
          )}

          {leafType === 3 && (
            // Style 3: Willow spear leaf (Slender, streamlined, elegant curve)
            <g>
              <path 
                d="M16 1C15 5 12 11 11 16C9.5 22 12.5 25.5 15.5 29L16 29C16.5 26 19.5 23 20.5 17C21.5 11 17.5 5 16 1Z" 
                fill={`url(#${gradientId})`}
                stroke={colors.primary}
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
              {/* Delicate midline and curved veins */}
              <path d="M16 1C15 8 15 18 15.5 29" stroke={colors.primary} strokeWidth="0.8" opacity="0.5" />
              <path d="M15.5 7 C14.5 10 13 12 12 13" stroke={colors.primary} strokeWidth="0.5" opacity="0.35" />
              <path d="M15.5 7 C16.5 10 18 12 19 13" stroke={colors.primary} strokeWidth="0.5" opacity="0.35" />
              <path d="M15.5 14 C14.2 17 13.5 19 12.5 20" stroke={colors.primary} strokeWidth="0.5" opacity="0.35" />
              <path d="M15.5 14 C16.8 17 17.5 19 18.5 20" stroke={colors.primary} strokeWidth="0.5" opacity="0.35" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

export function MeteorShower({ mode = 'meteors' }: { mode?: 'meteors' | 'leaves' }) {
  // Populate items
  const items = new Array(15).fill(0);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {items.map((_, i) => (
        mode === 'leaves' ? (
          <Leaf key={`leaf-${i}`} index={i} />
        ) : (
          <Meteor key={`meteor-${i}`} index={i} />
        )
      ))}
    </div>
  );
}
