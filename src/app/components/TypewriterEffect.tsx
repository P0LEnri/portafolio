'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface TypewriterEffectProps {
  text: string
  delay?: number
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, delay = 50 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const controls = useAnimation()

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
        controls.start({ opacity: 1 })
      }
    }, delay)

    return () => clearInterval(timer)
  }, [text, delay, controls])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
    </motion.span>
  )
}

export default TypewriterEffect

