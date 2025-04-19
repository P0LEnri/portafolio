'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCardProps {
  title: string
  description: string
  image: string
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, description, image }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        layoutId={`image-${title}`}
      />
      <motion.div className="p-4">
        <motion.h3 className="text-xl font-semibold mb-2" layoutId={`title-${title}`}>
          {title}
        </motion.h3>
        <motion.p
          className={`text-gray-600 ${isExpanded ? '' : 'line-clamp-2'}`}
          animate={{ height: isExpanded ? 'auto' : '3em' }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default AnimatedCard

