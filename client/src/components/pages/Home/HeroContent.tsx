'use client'

import { motion, Variants } from 'framer-motion'
import { HeroButton } from './HeroButton'

export function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className="space-y-6 text-center xl:text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Heading */}
      <motion.h1
        className="text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight"
        variants={itemVariants}
      >
        <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 bg-clip-text text-transparent">
          Discover Premium Tech
        </span>
        <br />
        <span className="text-slate-800">at GearGuild</span>
      </motion.h1>

      {/* Supporting Text */}
      <motion.p
        className="text-base lg:text-lg 2xl:text-xl text-slate-600 max-w-2xl xl:max-w-lg mx-auto xl:mx-0 leading-relaxed"
        variants={itemVariants}
      >
        Explore cutting-edge mobiles, powerful laptops, and premium accessories.
        Quality products with reliable service and fast delivery.
      </motion.p>

      {/* CTA Section */}
      <motion.div
        className="flex flex-col gap-6 items-center xl:items-start"
        variants={itemVariants}
      >
        <HeroButton />

        {/* Trust Indicators */}
        <motion.div
          className="flex items-center gap-6 text-xs sm:text-sm 2xl:text-base text-slate-500"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut"
              }
            }
          }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />
            <span>1 Year Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-purple-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            />
            <span>Secure Payment</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}