'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

interface PreviewFrameProps {
  title: string;
  children: (active: boolean) => React.ReactNode;
}

// Shared "app window" chrome for the coded project previews.
// Children receive `active` so animations can idle while off-screen.
const PreviewFrame = ({ title, children }: PreviewFrameProps) => {
  const { ref, inView } = useInView({ threshold: 0.25 });

  return (
    <div
      ref={ref}
      className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0B1120] flex flex-col select-none"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border-b border-white/10 shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[10px] sm:text-xs text-white/50 font-mono truncate">{title}</span>
      </div>
      <div className="relative flex-1 min-h-0">{children(inView)}</div>
    </div>
  );
};

export default PreviewFrame;
