'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import PreviewFrame from './PreviewFrame';

// Two hardcoded clusters (benign = teal, malignant = rose)
const BENIGN = [
  [60, 150], [78, 138], [52, 128], [90, 155], [70, 165], [102, 142],
  [86, 124], [64, 112], [110, 160], [95, 170], [120, 150], [108, 130],
];
const MALIGNANT = [
  [170, 60], [188, 48], [205, 70], [160, 78], [195, 90], [220, 55],
  [178, 35], [210, 38], [232, 75], [150, 52], [225, 95], [240, 45],
];
// Points the model "gets wrong" — they blink amber
const MISCLASSIFIED = [
  [138, 105],
  [148, 122],
];
const MATRIX = [
  { label: 'TP', value: 118 },
  { label: 'FP', value: 4 },
  { label: 'FN', value: 3 },
  { label: 'TN', value: 115 },
];

const AccuracyCounter = ({ active }: { active: boolean }) => {
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${v.toFixed(1)}%`);

  useEffect(() => {
    if (!active) return;
    const controls = animate(value, 97.4, { duration: 2, delay: 1, ease: 'easeOut' });
    return () => controls.stop();
  }, [active, value]);

  return <motion.span className="text-emerald-300 text-lg sm:text-2xl font-bold font-mono">{text}</motion.span>;
};

const Plot = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 flex">
    <svg viewBox="0 0 270 200" className="flex-1 min-w-0" preserveAspectRatio="xMidYMid meet">
      <line x1="30" y1="185" x2="260" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="30" y1="185" x2="30" y2="15" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Decision boundary draws, holds, then retracts */}
      <motion.path
        d="M 35 185 C 110 160, 120 90, 245 25"
        fill="none"
        stroke="#A5B4FC"
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: [0, 1, 1, 0] } : {}}
        transition={{ duration: 6, times: [0, 0.35, 0.8, 1], repeat: Infinity, repeatDelay: 0.8 }}
      />

      {BENIGN.map(([x, y], i) => (
        <motion.circle
          key={`b${i}`}
          cx={x}
          cy={y}
          r="4"
          fill="#2DD4BF"
          fillOpacity="0.85"
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
        />
      ))}
      {MALIGNANT.map(([x, y], i) => (
        <motion.circle
          key={`m${i}`}
          cx={x}
          cy={y}
          r="4"
          fill="#FB7185"
          fillOpacity="0.85"
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
        />
      ))}
      {MISCLASSIFIED.map(([x, y], i) => (
        <motion.circle
          key={`x${i}`}
          cx={x}
          cy={y}
          r="4.5"
          fill="#FBBF24"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: [0, 1, 0.4, 1] } : {}}
          transition={{ delay: 1.4, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}

      <text x="40" y="172" fill="#2DD4BF" fontSize="9" fontFamily="monospace">benign</text>
      <text x="195" y="115" fill="#FB7185" fontSize="9" fontFamily="monospace">malignant</text>
    </svg>

    <div className="w-[34%] shrink-0 border-l border-white/10 bg-white/[0.03] p-2 sm:p-3 flex flex-col justify-center gap-2">
      <div>
        <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 font-mono">Accuracy</p>
        <AccuracyCounter active={active} />
      </div>
      <div>
        <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-white/40 font-mono mb-1">Confusion matrix</p>
        <div className="grid grid-cols-2 gap-1">
          {MATRIX.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.6 + i * 0.25 }}
              className={`rounded px-1 py-0.5 text-center font-mono text-[9px] sm:text-[11px] border ${
                cell.label === 'TP' || cell.label === 'TN'
                  ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300'
                  : 'bg-rose-400/10 border-rose-400/30 text-rose-300'
              }`}
            >
              <span className="block text-white/40 text-[8px]">{cell.label}</span>
              {cell.value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TumorClassifierPreview = () => (
  <PreviewFrame title="tumor-classifier — scikit-learn">
    {(active) => <Plot active={active} />}
  </PreviewFrame>
);

export default TumorClassifierPreview;
