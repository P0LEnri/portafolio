'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PreviewFrame from './PreviewFrame';

// Hardcoded candles (SVG y-down: lower y = higher price)
const CANDLES = [
  { o: 140, c: 128, h: 120, l: 146 },
  { o: 128, c: 136, h: 122, l: 142 },
  { o: 136, c: 150, h: 130, l: 158 },
  { o: 150, c: 142, h: 136, l: 164 },
  { o: 142, c: 124, h: 118, l: 148 },
  { o: 124, c: 112, h: 104, l: 130 },
  { o: 112, c: 118, h: 106, l: 126 },
  { o: 118, c: 98, h: 92, l: 122 },
  { o: 98, c: 86, h: 78, l: 104 },
  { o: 86, c: 92, h: 80, l: 98 },
  { o: 92, c: 72, h: 64, l: 96 },
  { o: 72, c: 60, h: 52, l: 78 },
  { o: 60, c: 74, h: 56, l: 80 },
  { o: 74, c: 82, h: 68, l: 88 },
];
const X = (i: number) => 24 + i * 26;
const BUY_INDEX = 3;
const SELL_INDEX = 11;
const PRICES = ['67,241.52', '67,288.10', '67,164.87', '67,305.44'];
const STATUSES = [
  { label: 'ALERT RECEIVED', cls: 'bg-amber-400/15 text-amber-300 border-amber-400/30' },
  { label: 'EXECUTING', cls: 'bg-sky-400/15 text-sky-300 border-sky-400/30' },
  { label: 'FILLED', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30' },
];

const linePoints = CANDLES.map((c, i) => `${X(i) + 6},${c.c}`).join(' ');

const Chart = ({ active }: { active: boolean }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, [active]);

  const status = STATUSES[tick % STATUSES.length];

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-3 py-1.5 text-[10px] sm:text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-white/90 font-semibold">BTC/USDT</span>
          <motion.span
            key={tick % PRICES.length}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-emerald-300"
          >
            {PRICES[tick % PRICES.length]}
          </motion.span>
        </div>
        <motion.span
          key={status.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-2 py-0.5 rounded-full border ${status.cls}`}
        >
          TV alert → Quantfury · {status.label}
        </motion.span>
      </div>

      <svg viewBox="0 0 400 190" className="flex-1 w-full" preserveAspectRatio="xMidYMid meet">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        {CANDLES.map((c, i) => {
          const up = c.c < c.o;
          const top = Math.min(c.o, c.c);
          const height = Math.max(Math.abs(c.o - c.c), 2);
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={active ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
              style={{ originY: '160px', transformBox: 'fill-box' }}
            >
              <line x1={X(i) + 6} y1={c.h} x2={X(i) + 6} y2={c.l} stroke={up ? '#34D399' : '#FB7185'} strokeWidth="1.5" />
              <rect x={X(i)} y={top} width="12" height={height} rx="1" fill={up ? '#34D399' : '#FB7185'} />
            </motion.g>
          );
        })}

        <motion.polyline
          points={linePoints}
          fill="none"
          stroke="#A5B4FC"
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={active ? { pathLength: 1 } : {}}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
        />

        {[
          { i: BUY_INDEX, y: CANDLES[BUY_INDEX].l + 14, color: '#34D399', label: 'BUY', flip: false },
          { i: SELL_INDEX, y: CANDLES[SELL_INDEX].h - 14, color: '#FB7185', label: 'SELL', flip: true },
        ].map(({ i, y, color, label, flip }) => (
          <motion.g
            key={label}
            initial={{ opacity: 0, scale: 0 }}
            animate={active ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1 + i * 0.08, type: 'spring', stiffness: 300, damping: 15 }}
          >
            <motion.circle
              cx={X(i) + 6}
              cy={y}
              r="8"
              fill="none"
              stroke={color}
              animate={active ? { r: [8, 16], opacity: [0.7, 0] } : {}}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
            <path
              d={flip ? `M ${X(i)} ${y - 3} l 6 6 l 6 -6 z` : `M ${X(i)} ${y + 3} l 6 -6 l 6 6 z`}
              fill={color}
            />
            <text x={X(i) + 6} y={flip ? y - 8 : y + 16} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold">
              {label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

const TradingBotPreview = () => (
  <PreviewFrame title="trading-bot — TradingView → Quantfury">
    {(active) => <Chart active={active} />}
  </PreviewFrame>
);

export default TradingBotPreview;
