'use client';

import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import Intro from '@/app/components/Sections/Intro';
import Projects from '@/app/components/Sections/Projects';
import Experience from '@/app/components/Sections/Experience';
import Skills from '@/app/components/Sections/Skills';
import Contact from '@/app/components/Sections/Contact';
import NeuralBackground from '@/app/components/ParallaxBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />
      <div className="relative">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section id="intro">
            <Intro />
          </section>

          <section id="experience">
            <Experience />
          </section>

          <section id="projects">
            <Projects />
          </section>
          
          <section id="skills">
            <Skills />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </motion.main>
      </div>
    </div>
  );
}