'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  technologies: string[]
  description: string
  image: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, technologies, description, image }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative h-48 md:h-64"
        initial={false}
        animate={{ height: isExpanded ? '15rem' : '12rem' }}
      >
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 ease-in-out"
        />
      </motion.div>
      <motion.div
        className="p-4"
        initial={false}
        animate={{ height: isExpanded ? 'auto' : '8rem' }}
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <motion.p
          className="text-gray-600"
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard

