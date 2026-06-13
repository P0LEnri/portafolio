'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PreviewFrame from './PreviewFrame';

const STUDENTS = [
  { y: 55, query: 'thesis: CV for medical imaging', scores: [0.31, 0.58, 0.92, 0.44], winner: 2 },
  { y: 105, query: 'topic: NLP conversational agents', scores: [0.87, 0.42, 0.29, 0.51], winner: 0 },
  { y: 155, query: 'topic: time-series forecasting', scores: [0.38, 0.91, 0.47, 0.33], winner: 1 },
];
const ADVISORS = [35, 85, 135, 185];
const SX = 70;
const AX = 330;

// Sample a cubic bezier into keyframe arrays so the embedding dots can travel along it
const bezierKeyframes = (sy: number, ay: number) => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let s = 0; s <= 10; s++) {
    const t = s / 10;
    const mt = 1 - t;
    xs.push(mt ** 3 * SX + 3 * mt ** 2 * t * (SX + 90) + 3 * mt * t ** 2 * (AX - 90) + t ** 3 * AX);
    ys.push(mt ** 3 * sy + 3 * mt ** 2 * t * sy + 3 * mt * t ** 2 * ay + t ** 3 * ay);
  }
  return { xs, ys };
};

const edgePath = (sy: number, ay: number) =>
  `M ${SX} ${sy} C ${SX + 90} ${sy}, ${AX - 90} ${ay}, ${AX} ${ay}`;

const Graph = ({ active }: { active: boolean }) => {
  const [studentIdx, setStudentIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setStudentIdx((s) => (s + 1) % STUDENTS.length), 4500);
    return () => clearInterval(id);
  }, [active]);

  const student = STUDENTS[studentIdx];

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-3 pt-2 h-8 shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={studentIdx}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-400/10 border border-indigo-400/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
            <span className="text-[9px] sm:text-[11px] font-mono text-indigo-200">{student.query}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <svg viewBox="0 0 400 210" className="flex-1 w-full" preserveAspectRatio="xMidYMid meet">
        {/* faint full bipartite mesh */}
        {STUDENTS.map((s) =>
          ADVISORS.map((ay) => (
            <path key={`${s.y}-${ay}`} d={edgePath(s.y, ay)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))
        )}

        {/* winning edge glow — restarts per student via key */}
        <motion.path
          key={`win-${studentIdx}`}
          d={edgePath(student.y, ADVISORS[student.winner])}
          fill="none"
          stroke="#818CF8"
          strokeWidth="2"
          style={{ filter: 'drop-shadow(0 0 4px rgba(129,140,248,0.9))' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.7, ease: 'easeOut' }}
        />

        {/* embedding dots traveling to each advisor */}
        {active &&
          ADVISORS.map((ay, i) => {
            const { xs, ys } = bezierKeyframes(student.y, ay);
            return (
              <motion.circle
                key={`dot-${studentIdx}-${i}`}
                r="3"
                fill="#C4B5FD"
                initial={{ cx: SX, cy: student.y, opacity: 0 }}
                animate={{ cx: xs, cy: ys, opacity: [0, 1, 1, 0] }}
                transition={{ delay: 0.6 + i * 0.15, duration: 1.4, ease: 'easeInOut' }}
              />
            );
          })}

        {/* student nodes */}
        {STUDENTS.map((s, i) => (
          <g key={`s-${i}`}>
            <motion.circle
              cx={SX}
              cy={s.y}
              r="10"
              fill={i === studentIdx ? 'rgba(129,140,248,0.35)' : 'rgba(255,255,255,0.08)'}
              stroke={i === studentIdx ? '#818CF8' : 'rgba(255,255,255,0.25)'}
              strokeWidth="1.5"
              animate={active && i === studentIdx ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x={SX - 18} y={s.y + 3} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">
              student
            </text>
          </g>
        ))}

        {/* advisor nodes + similarity scores */}
        {ADVISORS.map((ay, i) => {
          const isWinner = i === student.winner;
          return (
            <g key={`a-${i}`}>
              <motion.circle
                key={`an-${studentIdx}-${i}`}
                cx={AX}
                cy={ay}
                r="10"
                fill={isWinner ? 'rgba(129,140,248,0.4)' : 'rgba(255,255,255,0.08)'}
                stroke={isWinner ? '#A5B4FC' : 'rgba(255,255,255,0.25)'}
                strokeWidth="1.5"
                animate={active && isWinner ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ delay: 2.4, duration: 1, repeat: active && isWinner ? Infinity : 0, repeatDelay: 0.5 }}
              />
              <motion.text
                key={`score-${studentIdx}-${i}`}
                x={AX + 18}
                y={ay + 3}
                fill={isWinner ? '#A5B4FC' : 'rgba(255,255,255,0.4)'}
                fontSize={isWinner ? '11' : '9'}
                fontWeight={isWinner ? 'bold' : 'normal'}
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 + i * 0.12 }}
              >
                {student.scores[i].toFixed(2)}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SemanticSearchPreview = () => (
  <PreviewFrame title="advisor-match — Sentence-BERT semantic search">
    {(active) => <Graph active={active} />}
  </PreviewFrame>
);

export default SemanticSearchPreview;
