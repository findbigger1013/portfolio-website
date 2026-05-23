import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../lib/sound';

export function SoundToggle() {
  const [enabled, setEnabled] = useState(soundManager.enabled);

  useEffect(() => {
    setEnabled(soundManager.enabled);
  }, []);

  const toggle = () => {
    soundManager.toggle();
    setEnabled(soundManager.enabled);
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={soundManager.playHover}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-glow-purple/30 shadow-[0_4px_15px_rgba(169,120,255,0.2)] text-glow-purple hover:shadow-[0_4px_25px_rgba(169,120,255,0.4)] hover:bg-white/80 transition-all duration-300 group flex items-center justify-center cursor-pointer"
      aria-label="Toggle Sound"
    >
      <div className="absolute inset-0 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 bg-glow-purple/20 transition-opacity pointer-events-none" />
      <span className="relative z-10">
        {enabled ? <Volume2 size={20} strokeWidth={2} /> : <VolumeX size={20} strokeWidth={2} />}
      </span>
      {/* Tooltip */}
      <span className="absolute right-full mr-3 whitespace-nowrap bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[11px] font-bold text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
        {enabled ? '声音开' : '声音关'}
      </span>
    </button>
  );
}
