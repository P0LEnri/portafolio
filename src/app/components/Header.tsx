import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#intro' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
   
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="fixed top-6 inset-x-0 mx-auto z-50 w-fit"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="relative">
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center justify-center space-x-2 px-8 py-4 
            rounded-full bg-gradient-to-r from-white/10 to-white/5 
            border border-white/10 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-4 py-1 text-sm tracking-wide uppercase 
                  text-white/80 hover:text-white group transition-colors duration-300"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-indigo-400 
                  group-hover:w-full transition-all duration-300"/>
              </a>
              {index < navItems.length - 1 && (
                <span className="w-[1px] h-3 bg-white/10"/>
              )}
            </React.Fragment>
          ))}

          {/* Decorative elements */}
          <div className="absolute inset-0 rounded-full opacity-50 
            bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 
            blur-sm -z-10"/>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-6 py-3 rounded-full bg-white/10 border border-white/20
              backdrop-blur-sm text-white/90 hover:text-white transition-colors duration-300"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <motion.span
                animate={{
                  transform: isMobileMenuOpen ? "rotate(45deg) translate(2px, 5px)" : "none",
                }}
                className="block w-5 h-0.5 bg-current"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                className="block w-5 h-0.5 bg-current"
              />
              <motion.span
                animate={{
                  transform: isMobileMenuOpen ? "rotate(-45deg) translate(2px, -5px)" : "none",
                }}
                className="block w-5 h-0.5 bg-current"
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
          initial="hidden"
          animate={isMobileMenuOpen ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -20 },
          }}
        >
          <div className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
            border border-white/20 backdrop-blur-sm overflow-hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 
                  text-sm tracking-wide uppercase transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;