import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ isSubmitting: false, isSubmitted: false, error: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus({ isSubmitting: true, isSubmitted: false, error: false });

    // For GitHub Pages: Using Formspree as a form backend service
    // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
    try {
      const response = await fetch('https://formspree.io/f/xovegayd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus({ isSubmitting: false, isSubmitted: true, error: false });
        setTimeout(() => {
          setStatus({ isSubmitting: false, isSubmitted: false, error: false });
          setFormState({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setStatus({ isSubmitting: false, isSubmitted: false, error: true });
      setTimeout(() => {
        setStatus({ isSubmitting: false, isSubmitted: false, error: false });
      }, 3000);
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
            text-white placeholder:text-white/50 focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
            text-white placeholder:text-white/50 focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <textarea
          placeholder="Message"
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          required
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
            text-white placeholder:text-white/50 focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
        />
      </motion.div>

      <motion.button
  type="submit"
  disabled={status.isSubmitting || status.isSubmitted}
  className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300
    ${status.error ? 'bg-red-500' : status.isSubmitted ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}
    text-white hover:opacity-90 disabled:opacity-70 shadow-md hover:shadow-lg 
    flex items-center justify-center gap-2 border border-white/20`}
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
  
  <AnimatePresence mode="wait">
    {status.isSubmitting ? (
      <motion.span className="flex items-center justify-center gap-2">
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
        Sending...
      </motion.span>
    ) : status.isSubmitted ? (
      <motion.span className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
        </svg>
        Sent!
      </motion.span>
    ) : status.error ? (
      <motion.span className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Error. Try again.
      </motion.span>
    ) : (
      'Send Message'
    )}
  </AnimatePresence>
</motion.button>
    </motion.form>
  );
};

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/P0LEnri',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/enrique-islas-osorio/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  }
];

const Contact = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-white to-indigo-200 
            bg-clip-text text-transparent mb-4">
            Contact Me
          </h2>
          <p className="text-xl text-white/80">Have a project in mind? Let's talk!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
          <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 
            border border-white/10 backdrop-blur-sm">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 
                border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-6">Social Media</h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-white/80 hover:text-white group
                      transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="group-hover:text-indigo-400 transition-colors duration-300">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 
                border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-4">Location</h3>
              <p className="text-white/80">Mexico City, Mexico</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;