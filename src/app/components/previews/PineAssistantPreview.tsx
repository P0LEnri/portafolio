'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PreviewFrame from './PreviewFrame';

const USER_MSG = 'Build an RSI mean-reversion strategy';

// Pre-tokenized fake Pine Script for span-based syntax highlighting
const CODE_LINES: { tokens: { text: string; cls: string }[] }[] = [
  { tokens: [{ text: '//@version=5', cls: 'text-white/35' }] },
  {
    tokens: [
      { text: 'strategy', cls: 'text-sky-300' },
      { text: '(', cls: 'text-white/70' },
      { text: '"RSI Reversion"', cls: 'text-emerald-300' },
      { text: ', overlay=', cls: 'text-white/70' },
      { text: 'true', cls: 'text-violet-300' },
      { text: ')', cls: 'text-white/70' },
    ],
  },
  {
    tokens: [
      { text: 'rsi = ', cls: 'text-white/70' },
      { text: 'ta.rsi', cls: 'text-sky-300' },
      { text: '(close, ', cls: 'text-white/70' },
      { text: '14', cls: 'text-amber-300' },
      { text: ')', cls: 'text-white/70' },
    ],
  },
  {
    tokens: [
      { text: 'if', cls: 'text-violet-300' },
      { text: ' rsi < ', cls: 'text-white/70' },
      { text: '30', cls: 'text-amber-300' },
    ],
  },
  {
    tokens: [
      { text: '    strategy.entry', cls: 'text-sky-300' },
      { text: '(', cls: 'text-white/70' },
      { text: '"Long"', cls: 'text-emerald-300' },
      { text: ', strategy.long)', cls: 'text-white/70' },
    ],
  },
];

const TYPE_DONE = USER_MSG.length * 0.035 + 0.3; // when the user message finishes typing
const CODE_START = TYPE_DONE + 1.1; // after the "thinking" dots

const Chat = ({ active }: { active: boolean }) => {
  const [cycle, setCycle] = useState(0);

  // Remount the whole conversation periodically so the sequence loops
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setCycle((c) => c + 1), 12000);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return <div className="absolute inset-0" />;

  return (
    <div key={cycle} className="absolute inset-0 flex flex-col p-2.5 sm:p-3 gap-2 font-mono text-[9px] sm:text-[11px] overflow-hidden">
      {/* user message typing in */}
      <div className="self-end max-w-[80%] bg-indigo-500/20 border border-indigo-400/30 rounded-lg rounded-br-sm px-2.5 py-1.5 text-indigo-100">
        {USER_MSG.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.035, duration: 0 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* thinking dots */}
      <motion.div
        className="self-start flex gap-1 px-2.5 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: TYPE_DONE, duration: 1.1, times: [0, 0.2, 0.8, 1] }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/50"
            animate={{ y: [0, -3, 0] }}
            transition={{ delay: TYPE_DONE + i * 0.15, duration: 0.5, repeat: 2 }}
          />
        ))}
      </motion.div>

      {/* assistant code block, line by line */}
      <motion.div
        className="self-start w-[88%] bg-black/40 border border-white/10 rounded-lg rounded-bl-sm px-2.5 py-2 leading-relaxed"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: CODE_START }}
      >
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="whitespace-pre"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: CODE_START + 0.2 + i * 0.45 }}
          >
            {line.tokens.map((t, j) => (
              <span key={j} className={t.cls}>
                {t.text}
              </span>
            ))}
            {i === CODE_LINES.length - 1 && (
              <span className="inline-block w-1.5 h-3 ml-0.5 bg-indigo-300 align-middle animate-blink" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* footer badge */}
      <motion.div
        className="mt-auto self-start inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: CODE_START + 0.2 + CODE_LINES.length * 0.45 + 0.3 }}
      >
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        tokens optimized −38%
      </motion.div>
    </div>
  );
};

const PineAssistantPreview = () => (
  <PreviewFrame title="pine-assistant — AI code generation">
    {(active) => <Chat active={active} />}
  </PreviewFrame>
);

export default PineAssistantPreview;
