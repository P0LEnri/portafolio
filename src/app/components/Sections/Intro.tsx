import { motion } from 'framer-motion';

const Intro = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        {/* Main heading with gradient text */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-white to-indigo-200 bg-clip-text text-transparent">
          Enrique Islas Osorio
          </h1>
          <div className="flex justify-center space-x-2">
            <span className="h-1 w-12 bg-indigo-500 rounded-full"/>
            <span className="h-1 w-12 bg-purple-500 rounded-full"/>
            <span className="h-1 w-12 bg-pink-500 rounded-full"/>
          </div>
        </motion.div>

        {/* Role and description */}
        <motion.div variants={itemVariants} className="space-y-6 mb-12">
        
        <motion.h2 
          variants={textVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500"
        >
          Artificial Intelligence Solutions Developer
        </motion.h2>
        <motion.p 
          variants={textVariants}
          className="text-lg md:text-xl text-white/80 leading-relaxed font-light"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 font-medium">
            Engineer passionate about AI
            </span>
            , specialized in Machine Learning and automation.
            I develop intelligent solutions that simplify your day: from virtual assistants
            to systems that analyze data for you. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 font-medium">
            I make sure technology works for you, while you focus on what matters
            </span>
          .
        </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="/cv.pdf" 
            download
            className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium text-lg 
              hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download CV
          </a>
          <a 
            href="#contact"
            className="px-8 py-3 bg-transparent border-2 border-white/20 text-white 
              rounded-full font-medium text-lg hover:bg-white/10 transition-colors duration-300
              flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Let's talk about your ideas
          </a>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"/>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"/>
      </motion.div>
    </div>
  );
};

export default Intro;