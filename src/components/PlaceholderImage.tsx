import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export function PlaceholderImage({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-brand-aliceblue/50 border border-brand-lavender/50 rounded-2xl text-brand-muted p-8 ${className}`}>
      <ImageIcon className="w-8 h-8 mb-3 opacity-50" />
      <span className="text-[10px] uppercase tracking-widest text-center">{text}</span>
    </div>
  );
}
