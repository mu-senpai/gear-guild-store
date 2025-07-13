'use client'

import { motion } from 'motion/react'
import { ArrowRightOutlined } from '@ant-design/icons'
import Link from 'next/link'

export function HeroButton() {
  return (
    <Link href={`/products`} className='block'>
      <motion.button
        className="cursor-pointer group relative inline-flex items-center gap-2 2xl:gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 lg:px-6 2xl:px-8 py-2 lg:py-3 2xl:py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Shop Now</span>
        <motion.div
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <ArrowRightOutlined />
        </motion.div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
      </motion.button>
    </Link>
  )
}